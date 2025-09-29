package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.RequestCreateDto;
import com.klevispllumbi.klosismart.dto.RequestDto;
import com.klevispllumbi.klosismart.dto.StatusBreakdownDto;
import com.klevispllumbi.klosismart.dto.TimeSeriesDto;
import com.klevispllumbi.klosismart.model.*;
import com.klevispllumbi.klosismart.repository.RequestFileRepository;
import com.klevispllumbi.klosismart.repository.RequestRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final RequestFileRepository fileRepository;

    private final String uploadDir = "uploads/requests/";

    public RequestDto createRequest(RequestCreateDto dto, User user) {

        Request request = new Request();
        request.setTitle(dto.getTitle());
        request.setDescription(dto.getDescription());
        request.setLatitude(dto.getLatitude());
        request.setLongitude(dto.getLongitude());
        request.setStatus(RequestStatus.E_RE);
        request.setCreatedAt(LocalDateTime.now());
        request.setUser(user);

        List<RequestFile> files = new ArrayList<>();
        if (dto.getFiles() != null) {
            for (MultipartFile file : dto.getFiles()) {

                String cleanFileName = file.getOriginalFilename()
                        .replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
                String fileName = System.currentTimeMillis() + "_" + cleanFileName;

                try {
                    Files.createDirectories(Paths.get(uploadDir));
                    Path targetPath = Paths.get(uploadDir + fileName);
                    Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new RuntimeException("Dështoi ruajtja e file-it: " + fileName, e);
                }

                FileCategory category = file.getContentType().startsWith("image/")
                        ? FileCategory.IMAGE
                        : FileCategory.DOCUMENT;

                RequestFile rf = new RequestFile();
                rf.setFileName(file.getOriginalFilename());
                rf.setFileType(file.getContentType());
                rf.setFilePath(uploadDir + fileName);
                rf.setCategory(category);
                rf.setRequest(request);
                files.add(rf);
            }
        }
        request.setFiles(files);

        Request saved = requestRepository.save(request);
        fileRepository.saveAll(files);

        // TODO: dergo email tek admin-et

        return mapToDto(saved);
    }

    public List<RequestDto> getAllRequests() {
        List<Request> list = requestRepository.findAll();
        List<RequestDto> dtoList = new ArrayList<>();
        for (Request r : list) {
            dtoList.add(mapToDto(r));
        }
        return dtoList;
    }

    public List<RequestDto> getRequestsByStatus(RequestStatus status) {
        List<Request> list = requestRepository.findByStatus(status);
        List<RequestDto> dtoList = new ArrayList<>();
        for (Request r : list) {
            dtoList.add(mapToDto(r));
        }
        return dtoList;
    }

    public RequestDto getRequestById(Long id) {
        Request r = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kërkesa nuk u gjet"));
        return mapToDto(r);
    }

    public RequestDto updateRequestStatus(Long id, String statusStr) {
        RequestStatus newStatus;
        try {
            newStatus = RequestStatus.valueOf(statusStr);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status i pavlefshëm: " + statusStr);
        }

        Request r = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kërkesa nuk u gjet me id: " + id));

        r.setStatus(newStatus);

        if (newStatus == RequestStatus.E_ZGJIDHUR) {
            r.setResolvedAt(LocalDateTime.now());
        }

        Request saved = requestRepository.save(r);
        return mapToDto(saved);
    }

    private RequestDto mapToDto(Request r) {
        RequestDto dto = new RequestDto();
        dto.setId(r.getId());
        dto.setTitle(r.getTitle());
        dto.setDescription(r.getDescription());
        dto.setStatus(r.getStatus().name());
        dto.setLatitude(r.getLatitude());
        dto.setLongitude(r.getLongitude());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setResolvedAt(r.getResolvedAt());
        dto.setUserEmail(r.getUser().getEmail());
        dto.setUserName(r.getUser().getName() + " " + r.getUser().getSurname());

        List<String> imageUrls = new ArrayList<>();
        List<String> documentUrls = new ArrayList<>();
        if (r.getFiles() != null) {
            for (RequestFile f : r.getFiles()) {
                String fileName = Paths.get(f.getFilePath()).getFileName().toString();
                if (f.getCategory() == FileCategory.IMAGE) {
                    imageUrls.add("/api/admin/files/" + fileName);
                } else {
                    documentUrls.add("/api/admin/files/" + fileName);
                }
            }
        }
        dto.setImageUrls(imageUrls);
        dto.setDocumentUrls(documentUrls);

        return dto;
    }

    @Transactional(readOnly = true)
    public TimeSeriesDto getRequestsSeries(String range, String tz) {
        String normalized = normalizeRange(range); // Yearly | Monthly | Weekly | Today
        ZoneId zone = tz != null && !tz.isBlank() ? ZoneId.of(tz) : ZoneId.systemDefault();
        ZonedDateTime now = ZonedDateTime.now(zone);

        return switch (normalized) {
            case "Yearly" -> yearly(now);
            case "Monthly" -> monthly(now);
            case "Weekly" -> weekly(now);
            case "Today" -> today(now);
            default -> monthly(now);
        };
    }

    private TimeSeriesDto yearly(ZonedDateTime now) {
        // 12 muajt e fundit (përfshirë muajin aktual)
        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();
        ZonedDateTime cursorEnd = now.withDayOfMonth(1).plusMonths(1).with(LocalTime.MIN);
        ZonedDateTime cursorStart = cursorEnd.minusMonths(12);

        ZonedDateTime iter = cursorStart;
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MMM").withLocale(java.util.Locale.ENGLISH);

        long total = 0;
        while (iter.isBefore(cursorEnd)) {
            ZonedDateTime bucketStart = iter;
            ZonedDateTime bucketEnd = iter.plusMonths(1);
            long count = countBetween(bucketStart, bucketEnd);
            labels.add(fmt.format(bucketStart));
            data.add(count);
            total += count;
            iter = bucketEnd;
        }
        return new TimeSeriesDto("Yearly", labels, data, total);
    }

    private TimeSeriesDto monthly(ZonedDateTime now) {
        // 30 ditë të fundit (dita si bucket)
        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();
        ZonedDateTime end = now.plusDays(1).toLocalDate().atStartOfDay(now.getZone()); // nesër 00:00
        ZonedDateTime start = end.minusDays(30);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd.MM");

        long total = 0;
        ZonedDateTime iter = start;
        while (iter.isBefore(end)) {
            ZonedDateTime bucketStart = iter;
            ZonedDateTime bucketEnd = iter.plusDays(1);
            long count = countBetween(bucketStart, bucketEnd);
            labels.add(fmt.format(bucketStart));
            data.add(count);
            total += count;
            iter = bucketEnd;
        }
        return new TimeSeriesDto("Monthly", labels, data, total);
    }

    private TimeSeriesDto weekly(ZonedDateTime now) {
        // 7 ditë të fundit
        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();
        ZonedDateTime end = now.plusDays(1).toLocalDate().atStartOfDay(now.getZone());
        ZonedDateTime start = end.minusDays(7);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("EEE"); // Mon, Tue...

        long total = 0;
        ZonedDateTime iter = start;
        while (iter.isBefore(end)) {
            ZonedDateTime bucketStart = iter;
            ZonedDateTime bucketEnd = iter.plusDays(1);
            long count = countBetween(bucketStart, bucketEnd);
            labels.add(fmt.format(bucketStart));
            data.add(count);
            total += count;
            iter = bucketEnd;
        }
        return new TimeSeriesDto("Weekly", labels, data, total);
    }

    private TimeSeriesDto today(ZonedDateTime now) {
        // 24 orët e fundit (me bucket-orë)
        List<String> labels = new ArrayList<>();
        List<Long> data = new ArrayList<>();
        ZonedDateTime end = now.truncatedTo(ChronoUnit.HOURS).plusHours(1);
        ZonedDateTime start = end.minusHours(24);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("HH:mm");

        long total = 0;
        ZonedDateTime iter = start;
        while (iter.isBefore(end)) {
            ZonedDateTime bucketStart = iter;
            ZonedDateTime bucketEnd = iter.plusHours(1);
            long count = countBetween(bucketStart, bucketEnd);
            labels.add(fmt.format(bucketStart));
            data.add(count);
            total += count;
            iter = bucketEnd;
        }
        return new TimeSeriesDto("Today", labels, data, total);
    }

    private long countBetween(ZonedDateTime start, ZonedDateTime end) {
        // Konverto në server-default ose UTC për në DB (LocalDateTime)
        LocalDateTime s = start.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime();
        LocalDateTime e = end.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime();
        return requestRepository.countByCreatedAtBetween(s, e);
    }

    private String normalizeRange(String r) {
        if (r == null) return "Monthly";
        return switch (r.trim().toLowerCase()) {
            case "yearly" -> "Yearly";
            case "weekly" -> "Weekly";
            case "today"  -> "Today";
            default -> "Monthly";
        };
    }

    @Transactional(readOnly = true)
    public StatusBreakdownDto getStatusBreakdown(String range, String tz) {
        String r = normalizeRange(range);
        ZoneId zone = (tz != null && !tz.isBlank()) ? ZoneId.of(tz) : ZoneId.systemDefault();
        ZonedDateTime now = ZonedDateTime.now(zone);

        // intervali kohor sipas dropdown
        ZonedDateTime end, start;
        switch (r) {
            case "Today" -> { end = now.truncatedTo(ChronoUnit.DAYS).plusDays(1); start = end.minusDays(1); }
            case "Weekly" -> { end = now.truncatedTo(ChronoUnit.DAYS).plusDays(1); start = end.minusDays(7); }
            case "Yearly" -> {
                end = now.withDayOfMonth(1).plusMonths(1).with(LocalTime.MIN); // fillimi i muajit tjetër
                start = end.minusMonths(12);
            }
            default -> { // Monthly
                end = now.truncatedTo(ChronoUnit.DAYS).plusDays(1);
                start = end.minusDays(30);
            }
        }

        // në DB përdorim UTC
        LocalDateTime s = start.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime();
        LocalDateTime e = end.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime();

        long cEre       = requestRepository.countByStatusAndCreatedAtBetween(RequestStatus.E_RE, s, e);
        long cNeProces  = requestRepository.countByStatusAndCreatedAtBetween(RequestStatus.NE_PROCES, s, e);
        long cEzgjidhur = requestRepository.countByStatusAndCreatedAtBetween(RequestStatus.E_ZGJIDHUR, s, e);
        long total = cEre + cNeProces + cEzgjidhur;

        return new StatusBreakdownDto(
                r,
                List.of("E_RE", "NE_PROCES", "E_ZGJIDHUR"),
                List.of(cEre, cNeProces, cEzgjidhur),
                total
        );
    }
}