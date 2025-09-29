// EventService.java
package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.*;
import com.klevispllumbi.klosismart.model.*;
import com.klevispllumbi.klosismart.notifications.dto.BroadcastPayload;
import com.klevispllumbi.klosismart.notifications.outbox.OutboxService;
import com.klevispllumbi.klosismart.repository.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.regex.Pattern;

@Service
@Transactional
public class EventService {

    private final EventRepository eventRepository;
    private final EventImageRepository imageRepository;
    private final EventDocumentRepository documentRepository;
    private final EventPersonRepository personRepository;
    private final EventActionRepository actionRepository;
    private final OutboxService outboxService;

    private final String uploadDir = "uploads/events/";

    public EventService(EventRepository eventRepository,
                        EventImageRepository imageRepository,
                        EventDocumentRepository documentRepository,
                        EventPersonRepository personRepository,
                        EventActionRepository actionRepository, OutboxService outboxService) {
        this.eventRepository = eventRepository;
        this.imageRepository = imageRepository;
        this.documentRepository = documentRepository;
        this.personRepository = personRepository;
        this.actionRepository = actionRepository;
        this.outboxService = outboxService;
    }

    // LIST with optional search ?q=
    public Page<EventDto> getAll(int page, int size, String q) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("startAt").descending());

        boolean hasQ = q != null && !q.isBlank();
        if (!hasQ) {
            return eventRepository.findAll(pageable).map(this::toDto);
        }

        String like = "%" + q.trim().toLowerCase() + "%";
        Specification<Event> spec = (root, cq, cb) -> cb.or(
                cb.like(cb.lower(root.get("title")), like),
                cb.like(cb.lower(root.get("summary")), like),
                cb.like(cb.lower(root.get("content")), like),
                cb.like(cb.lower(root.get("locationName")), like),
                cb.like(cb.lower(root.get("locationAddress")), like)
        );

        return eventRepository.findAll(spec, pageable).map(this::toDto);
    }

    public Page<EventDto> getAll(int page, int size, String q, boolean upcoming) {
        if (!upcoming) {
            return getAll(page, size, q); // reuse e metodës ekzistuese
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("startAt").ascending());
        var now = LocalDateTime.now(ZoneId.of("Europe/Tirane"));
        boolean hasQ = q != null && !q.isBlank();

        Page<Event> res = hasQ
                ? eventRepository.findUpcomingByQuery(now, q, pageable)
                : eventRepository.findUpcoming(now, pageable);

        return res.map(this::toDto);
    }

    public EventDto getBySlug(String slug) {
        Event ev = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Eventi nuk u gjet"));
        return toDto(ev);
    }

    public EventDto create(@Valid EventDto dto) {
        validateDates(dto.getStartAt(), dto.getEndAt());

        Event ev = new Event();
        ev.setTitle(dto.getTitle());
        ev.setSummary(dto.getSummary());
        ev.setContent(dto.getContent());
        ev.setStartAt(dto.getStartAt());
        ev.setEndAt(dto.getEndAt());
        ev.setLocationName(dto.getLocationName());
        ev.setLocationAddress(dto.getLocationAddress());
        ev.setLocationUrl(dto.getLocationUrl());
        ev.setMapLat(dto.getMapLat());
        ev.setMapLng(dto.getMapLng());

        // slug unik
        String slug = toSlug(ev.getTitle());
        int counter = 1;
        String original = slug;
        while (eventRepository.existsBySlug(slug)) {
            slug = original + "-" + counter++;
        }
        ev.setSlug(slug);

        // main image
        if (dto.getMainImage() != null && !dto.getMainImage().isEmpty()) {
            String mainPath = storeFile(dto.getMainImage());
            ev.setImageUrl(mainPath);
        }

        // images
        if (dto.getImages() != null) {
            for (MultipartFile file : dto.getImages()) {
                if (file.isEmpty()) continue;
                String path = storeFile(file);
                EventImage img = new EventImage();
                img.setFileName(file.getOriginalFilename());
                img.setFileType(file.getContentType());
                img.setFilePath(path);
                img.setEvent(ev);
                ev.getImages().add(img);
            }
        }

        // documents
        if (dto.getDocuments() != null) {
            for (MultipartFile file : dto.getDocuments()) {
                if (file.isEmpty()) continue;
                String path = storeFile(file);
                EventDocument doc = new EventDocument();
                doc.setFileName(file.getOriginalFilename());
                doc.setFileType(file.getContentType());
                doc.setFilePath(path);
                doc.setEvent(ev);
                ev.getDocuments().add(doc);
            }
        }

        // actions (agenda) – replace all from dto
        if (dto.getActions() != null) {
            for (EventActionDto a : dto.getActions()) {
                EventAction ea = new EventAction();
                ea.setOrderIndex(a.getOrderIndex());
                ea.setTitle(a.getTitle());
                ea.setDescription(a.getDescription());
                ea.setScheduledAt(a.getScheduledAt());
                ea.setEvent(ev);
                ev.getActions().add(ea);
            }
        }

        // persons (speakers/guests)
        if (dto.getPersons() != null) {
            for (EventPersonDto p : dto.getPersons()) {
                EventPerson ep = new EventPerson();
                ep.setOrderIndex(p.getOrderIndex());
                ep.setName(p.getName());
                ep.setRole(p.getRole());
                ep.setType(p.getType());
                ep.setPhotoPath(p.getPhotoUrl());
                ep.setEvent(ev);
                ev.getPersons().add(ep);
            }
        }

        Event saved = eventRepository.save(ev);

        var payload = BroadcastPayload.builder()
                .template("broadcast-email")
                .subject("📣 Event i ri: " + saved.getTitle())
                .message(saved.getSummary())
                .buttonText("Lexo më shumë")
                .buttonUrl(("http://localhost:3000/events/" + saved.getSlug()))
                .build();
        outboxService.enqueue("EVENTS_CREATED", payload);

        return toDto(saved);
    }

    public EventDto update(String slug,
                           @Valid EventDto dto,
                           boolean removeMainImage,
                           List<String> deleteImages,
                           List<String> deleteDocuments) {

        Event ev = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Eventi nuk u gjet"));

        validateDates(dto.getStartAt(), dto.getEndAt());

        ev.setTitle(dto.getTitle());
        ev.setSummary(dto.getSummary());
        ev.setContent(dto.getContent());
        ev.setStartAt(dto.getStartAt());
        ev.setEndAt(dto.getEndAt());
        ev.setLocationName(dto.getLocationName());
        ev.setLocationAddress(dto.getLocationAddress());
        ev.setLocationUrl(dto.getLocationUrl());
        ev.setMapLat(dto.getMapLat());
        ev.setMapLng(dto.getMapLng());

        // main image
        if (removeMainImage) {
            deletePhysicalFileIfExists(ev.getImageUrl());
            ev.setImageUrl(null);
        }
        if (dto.getMainImage() != null && !dto.getMainImage().isEmpty()) {
            deletePhysicalFileIfExists(ev.getImageUrl());
            String p = storeFile(dto.getMainImage());
            ev.setImageUrl(p);
        }

        if (ev.getImages() == null) ev.setImages(new ArrayList<>());
        if (ev.getDocuments() == null) ev.setDocuments(new ArrayList<>());
        if (ev.getActions() == null) ev.setActions(new ArrayList<>());
        if (ev.getPersons() == null) ev.setPersons(new ArrayList<>());

        List<String> delImgs = normalizeToRelativeApiPaths(deleteImages);
        if (!delImgs.isEmpty()) {
            Set<String> toDel = new HashSet<>(delImgs);
            Iterator<EventImage> it = ev.getImages().iterator();
            while (it.hasNext()) {
                EventImage img = it.next();
                if (toDel.contains(img.getFilePath())) {
                    deletePhysicalFileIfExists(img.getFilePath());
                    it.remove();
                    if (img.getId() != null) imageRepository.delete(img);
                }
            }
        }

        if (dto.getImages() != null) {
            for (MultipartFile f : dto.getImages()) {
                if (f == null || f.isEmpty()) continue;
                String p = storeFile(f);
                EventImage img = new EventImage();
                img.setFileName(f.getOriginalFilename());
                img.setFileType(f.getContentType());
                img.setFilePath(p);
                img.setEvent(ev);
                ev.getImages().add(img);
            }
        }

        List<String> delDocs = normalizeToRelativeApiPaths(deleteDocuments);
        if (!delDocs.isEmpty()) {
            Set<String> toDel = new HashSet<>(delDocs);
            Iterator<EventDocument> it = ev.getDocuments().iterator();
            while (it.hasNext()) {
                EventDocument d = it.next();
                if (toDel.contains(d.getFilePath())) {
                    deletePhysicalFileIfExists(d.getFilePath());
                    it.remove();
                    if (d.getId() != null) documentRepository.delete(d);
                }
            }
        }

        if (dto.getDocuments() != null) {
            for (MultipartFile f : dto.getDocuments()) {
                if (f == null || f.isEmpty()) continue;
                String p = storeFile(f);
                EventDocument d = new EventDocument();
                d.setFileName(f.getOriginalFilename());
                d.setFileType(f.getContentType());
                d.setFilePath(p);
                d.setEvent(ev);
                ev.getDocuments().add(d);
            }
        }

        ev.getActions().clear();
        if (dto.getActions() != null) {
            for (EventActionDto a : dto.getActions()) {
                EventAction ea = new EventAction();
                ea.setOrderIndex(a.getOrderIndex());
                ea.setTitle(a.getTitle());
                ea.setDescription(a.getDescription());
                ea.setScheduledAt(a.getScheduledAt());
                ea.setEvent(ev);
                ev.getActions().add(ea);
            }
        }

        ev.getPersons().clear();
        if (dto.getPersons() != null) {
            for (EventPersonDto p : dto.getPersons()) {
                EventPerson ep = new EventPerson();
                ep.setOrderIndex(p.getOrderIndex());
                ep.setName(p.getName());
                ep.setRole(p.getRole());
                ep.setType(p.getType());
                ep.setPhotoPath(p.getPhotoUrl());
                ep.setEvent(ev);
                ev.getPersons().add(ep);
            }
        }

        Event saved = eventRepository.save(ev);
        return toDto(saved);
    }

    public void deleteBySlug(String slug) {
        Event ev = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Eventi nuk u gjet"));

        // main
        deletePhysicalFileIfExists(ev.getImageUrl());

        // images
        if (ev.getImages() != null) {
            for (EventImage img : new ArrayList<>(ev.getImages())) {
                deletePhysicalFileIfExists(img.getFilePath());
                if (img.getId() != null) imageRepository.delete(img);
            }
            ev.getImages().clear();
        }

        // documents
        if (ev.getDocuments() != null) {
            for (EventDocument d : new ArrayList<>(ev.getDocuments())) {
                deletePhysicalFileIfExists(d.getFilePath());
                if (d.getId() != null) documentRepository.delete(d);
            }
            ev.getDocuments().clear();
        }

        eventRepository.delete(ev);
    }

    // ---------------- Helpers ----------------

    private void validateDates(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null)
            throw new RuntimeException("Datat e eventit janë të pavlefshme");
        if (end.isBefore(start))
            throw new RuntimeException("Data e mbarimit nuk mund të jetë para datës së fillimit");
    }

    private String storeFile(MultipartFile file) {
        String cleanFileName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
        String fileName = System.currentTimeMillis() + "_" + cleanFileName;
        try {
            Files.createDirectories(Paths.get(uploadDir));
            Path target = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/api/guest/files/events/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Dështoi ruajtja e file-it: " + fileName, e);
        }
    }

    private void deletePhysicalFileIfExists(String urlPath) {
        if (urlPath == null || urlPath.isBlank()) return;
        String fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        Path p = Paths.get(uploadDir + fileName);
        try {
            Files.deleteIfExists(p);
        } catch (IOException ignored) {}
    }

    private List<String> normalizeToRelativeApiPaths(List<String> urls) {
        if (urls == null) return List.of();
        List<String> out = new ArrayList<>();
        for (String u : urls) {
            if (u == null || u.isBlank()) continue;
            String path = u;
            try {
                var uri = java.net.URI.create(u);
                if (uri.getScheme() != null) path = uri.getPath();
            } catch (Exception ignored) {}
            out.add(path);
        }
        return out;
    }

    private String toSlug(String input) {
        String noWhiteSpace = Pattern.compile("\\s").matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        String slug = Pattern.compile("[^\\w-]").matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    private EventDto toDto(Event ev) {
        EventDto dto = new EventDto();
        dto.setId(ev.getId());
        dto.setTitle(ev.getTitle());
        dto.setSummary(ev.getSummary());
        dto.setContent(ev.getContent());
        dto.setSlug(ev.getSlug());
        dto.setStartAt(ev.getStartAt());
        dto.setEndAt(ev.getEndAt());
        dto.setLocationName(ev.getLocationName());
        dto.setLocationAddress(ev.getLocationAddress());
        dto.setLocationUrl(ev.getLocationUrl());
        dto.setMapLat(ev.getMapLat());
        dto.setMapLng(ev.getMapLng());

        dto.setMainImageUrl(ev.getImageUrl());
        dto.setImageUrls(ev.getImages() != null ? ev.getImages().stream().map(EventImage::getFilePath).toList() : List.of());
        dto.setDocumentUrls(ev.getDocuments() != null ? ev.getDocuments().stream().map(EventDocument::getFilePath).toList() : List.of());

        // actions
        List<EventActionDto> acts = new ArrayList<>();
        if (ev.getActions() != null) {
            for (EventAction a : ev.getActions()) {
                acts.add(new EventActionDto(a.getOrderIndex(), a.getTitle(), a.getDescription(), a.getScheduledAt()));
            }
        }
        dto.setActions(acts);

        // persons
        List<EventPersonDto> ppl = new ArrayList<>();
        if (ev.getPersons() != null) {
            for (EventPerson p : ev.getPersons()) {
                ppl.add(new EventPersonDto(p.getOrderIndex(), p.getName(), p.getRole(), p.getType(), p.getPhotoPath()));
            }
        }
        dto.setPersons(ppl);

        dto.setCreatedAt(ev.getCreatedAt());
        dto.setUpdatedAt(ev.getUpdatedAt());
        return dto;
    }
}
