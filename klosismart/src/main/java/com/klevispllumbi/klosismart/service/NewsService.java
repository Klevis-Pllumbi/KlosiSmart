package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.NewsDto;
import com.klevispllumbi.klosismart.model.News;
import com.klevispllumbi.klosismart.model.NewsDocument;
import com.klevispllumbi.klosismart.model.NewsImage;
import com.klevispllumbi.klosismart.model.Tag;
import com.klevispllumbi.klosismart.repository.NewsDocumentRepository;
import com.klevispllumbi.klosismart.repository.NewsImageRepository;
import com.klevispllumbi.klosismart.repository.NewsRepository;
import jakarta.annotation.Nullable;
import jakarta.persistence.criteria.JoinType;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;

import jakarta.persistence.criteria.Join;

@Service
@Transactional
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsImageRepository imageRepository;
    private final NewsDocumentRepository documentRepository;

    private final String uploadDir = "uploads/news/";

    public NewsService(NewsRepository newsRepository,
                       NewsImageRepository imageRepository,
                       NewsDocumentRepository documentRepository) {
        this.newsRepository = newsRepository;
        this.imageRepository = imageRepository;
        this.documentRepository = documentRepository;
    }

    public Page<NewsDto> getAllNews(int page, int size, @Nullable String q, @Nullable String tag) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        boolean hasQ = q != null && !q.isBlank();
        Tag tagEnum = parseTagEnum(tag); // null nëse s’është i vlefshëm

        // kur s’ka filtra, përdor variantin e thjeshtë
        if (!hasQ && tagEnum == null) {
            return newsRepository.findAll(pageable).map(this::convertToDto);
        }

        // start me një spec “bosh” të vlefshëm
        Specification<News> spec = (root, cq, cb) -> cb.conjunction();

        if (hasQ) {
            String like = "%" + q.trim().toLowerCase() + "%";
            spec = spec.and((root, cq, cb) -> cb.or(
                    cb.like(cb.lower(root.get("title")), like),
                    cb.like(cb.lower(root.get("summary")), like),
                    cb.like(cb.lower(root.get("content")), like)
            ));
        }

        if (tagEnum != null) {
            spec = spec.and((root, cq, cb) -> {
                // join te @ElementCollection(tags). Për disa versione generics mund të kërkojnë ? në vend të Tipit.
                Join<?, ?> tagsJoin = root.join("tags", JoinType.LEFT);
                cq.distinct(true);              // DISTINCT vendoset në CriteriaQuery, jo në Specification
                return cb.equal(tagsJoin, tagEnum);
            });
        }

        return newsRepository.findAll(spec, pageable).map(this::convertToDto);
    }

    private @Nullable Tag parseTagEnum(@Nullable String tag) {
        if (tag == null) return null;
        String t = tag.trim();
        if (t.isEmpty()) return null;
        try {
            return Tag.valueOf(t.toUpperCase(java.util.Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            return null; // tag i panjohur -> injoro filtrin
        }
    }

    public NewsDto createNews(@Valid NewsDto newsDto) {

        News news = new News();
        news.setTitle(newsDto.getTitle());
        news.setContent(newsDto.getContent());
        news.setSummary(newsDto.getSummary());
        news.setTags(newsDto.getTags());

        String slug = toSlug(news.getTitle());
        int counter = 1;
        String originalSlug = slug;
        while (newsRepository.existsBySlug(slug)) {
            slug = originalSlug + "-" + counter++;
        }
        news.setSlug(slug);

        // main image
        if (newsDto.getMainImage() != null && !newsDto.getMainImage().isEmpty()) {
            String mainImagePath = storeFile(newsDto.getMainImage());
            news.setImageUrl(mainImagePath);
        }

        // images
        List<NewsImage> newsImages = new ArrayList<>();
        if (newsDto.getImages() != null) {
            for (MultipartFile file : newsDto.getImages()) {
                if (file == null || file.isEmpty()) continue;
                String path = storeFile(file);
                NewsImage ni = new NewsImage();
                ni.setFileName(file.getOriginalFilename());
                ni.setFileType(file.getContentType());
                ni.setFilePath(path);
                ni.setNews(news);
                newsImages.add(ni);
            }
        }
        news.setImages(newsImages);

        // documents
        List<NewsDocument> newsDocuments = new ArrayList<>();
        if (newsDto.getDocuments() != null) {
            for (MultipartFile file : newsDto.getDocuments()) {
                if (file == null || file.isEmpty()) continue;
                String path = storeFile(file);
                NewsDocument nd = new NewsDocument();
                nd.setFileName(file.getOriginalFilename());
                nd.setFileType(file.getContentType());
                nd.setFilePath(path);
                nd.setNews(news);
                newsDocuments.add(nd);
            }
        }
        news.setDocuments(newsDocuments);

        News saved = newsRepository.save(news);
        documentRepository.saveAll(newsDocuments);
        imageRepository.saveAll(newsImages);

        return convertToDto(saved);
    }

    public NewsDto getNewsBySlug(String slug) {
        News news = newsRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Lajmi nuk u gjet"));
        return convertToDto(news);
    }

    /** ---------------------- NEW: UPDATE ---------------------- **/
    public NewsDto updateNews(String slug,
                              NewsDto newsDto,
                              boolean removeMainImage,
                              List<String> deleteImages,
                              List<String> deleteDocuments) {

        News news = newsRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Lajmi nuk u gjet"));

        // 1) Fusha bazë
        news.setTitle(newsDto.getTitle());
        news.setSummary(newsDto.getSummary());
        news.setContent(newsDto.getContent());
        news.setTags(newsDto.getTags());

        // 2) Main image: remove / replace / keep
        if (removeMainImage) {
            deletePhysicalFileIfExists(news.getImageUrl());
            news.setImageUrl(null);
        }
        if (newsDto.getMainImage() != null && !newsDto.getMainImage().isEmpty()) {
            // replace existing
            deletePhysicalFileIfExists(news.getImageUrl());
            String path = storeFile(newsDto.getMainImage());
            news.setImageUrl(path);
        }

        // Siguro listat
        if (news.getImages() == null) news.setImages(new ArrayList<>());
        if (news.getDocuments() == null) news.setDocuments(new ArrayList<>());

        // 3) Fshirje IMAGES (normalizo në relative /api/guest/files/news/..)
        List<String> deleteImagesRel = normalizeToRelativeApiPaths(deleteImages);
        if (!deleteImagesRel.isEmpty()) {
            Set<String> toDelete = new HashSet<>(deleteImagesRel);
            Iterator<NewsImage> it = news.getImages().iterator();
            while (it.hasNext()) {
                NewsImage img = it.next();
                if (toDelete.contains(img.getFilePath())) {
                    deletePhysicalFileIfExists(img.getFilePath());
                    it.remove();
                    if (img.getId() != null) imageRepository.delete(img);
                }
            }
        }

        // 4) Shto IMAGES të rinj
        if (newsDto.getImages() != null) {
            for (MultipartFile file : newsDto.getImages()) {
                if (file == null || file.isEmpty()) continue;
                String path = storeFile(file);
                NewsImage ni = new NewsImage();
                ni.setFileName(file.getOriginalFilename());
                ni.setFileType(file.getContentType());
                ni.setFilePath(path);
                ni.setNews(news);
                news.getImages().add(ni);
            }
        }

        // 5) Fshirje DOCUMENTS
        List<String> deleteDocsRel = normalizeToRelativeApiPaths(deleteDocuments);
        if (!deleteDocsRel.isEmpty()) {
            Set<String> toDelete = new HashSet<>(deleteDocsRel);
            Iterator<NewsDocument> it = news.getDocuments().iterator();
            while (it.hasNext()) {
                NewsDocument doc = it.next();
                if (toDelete.contains(doc.getFilePath())) {
                    deletePhysicalFileIfExists(doc.getFilePath());
                    it.remove();
                    if (doc.getId() != null) documentRepository.delete(doc);
                }
            }
        }

        // 6) Shto DOCUMENTS të rinj
        if (newsDto.getDocuments() != null) {
            for (MultipartFile file : newsDto.getDocuments()) {
                if (file == null || file.isEmpty()) continue;
                String path = storeFile(file);
                NewsDocument nd = new NewsDocument();
                nd.setFileName(file.getOriginalFilename());
                nd.setFileType(file.getContentType());
                nd.setFilePath(path);
                nd.setNews(news);
                news.getDocuments().add(nd);
            }
        }

        News saved = newsRepository.save(news);
        return convertToDto(saved);
    }
    /** ------------------- END NEW: UPDATE --------------------- **/

    @Transactional
    public void deleteNewsBySlug(String slug) {
        var news = newsRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Lajmi nuk u gjet"));

        // 1) Fshi main image (nëse ekziston)
        deletePhysicalFileIfExists(news.getImageUrl());

        // 2) Fshi IMAGES (skedar + rreshtat)
        if (news.getImages() != null && !news.getImages().isEmpty()) {
            // ruaj një kopje për të shmangur ConcurrentModification
            var imagesCopy = new java.util.ArrayList<>(news.getImages());
            for (var img : imagesCopy) {
                deletePhysicalFileIfExists(img.getFilePath());
                if (img.getId() != null) {
                    imageRepository.delete(img);
                }
            }
            news.getImages().clear();
        }

        // 3) Fshi DOCUMENTS (skedar + rreshtat)
        if (news.getDocuments() != null && !news.getDocuments().isEmpty()) {
            var docsCopy = new java.util.ArrayList<>(news.getDocuments());
            for (var doc : docsCopy) {
                deletePhysicalFileIfExists(doc.getFilePath());
                if (doc.getId() != null) {
                    documentRepository.delete(doc);
                }
            }
            news.getDocuments().clear();
        }

        // 4) Fshi vetë lajmin
        newsRepository.delete(news);
    }

    private NewsDto convertToDto(News news) {
        NewsDto dto = new NewsDto();
        dto.setId(news.getId());
        dto.setTitle(news.getTitle());
        dto.setContent(news.getContent());
        dto.setSummary(news.getSummary());
        dto.setSlug(news.getSlug());
        dto.setMainImageUrl(news.getImageUrl());
        dto.setMainImage(null);
        dto.setImageUrls(news.getImages() != null ?
                news.getImages().stream().map(NewsImage::getFilePath).toList() : List.of());
        dto.setDocumentUrls(news.getDocuments() != null ?
                news.getDocuments().stream().map(NewsDocument::getFilePath).toList() : List.of());
        dto.setTags(news.getTags());
        dto.setCreatedAt(news.getCreatedAt());
        dto.setUpdatedAt(news.getUpdatedAt());
        return dto;
    }

    private String storeFile(MultipartFile file) {
        String cleanFileName = file.getOriginalFilename()
                .replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
        String fileName = System.currentTimeMillis() + "_" + cleanFileName;

        try {
            Files.createDirectories(Paths.get(uploadDir));
            Path targetPath = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            return "/api/guest/files/news/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Dështoi ruajtja e file-it: " + fileName, e);
        }
    }

    private void deletePhysicalFileIfExists(String urlPath) {
        if (urlPath == null || urlPath.isBlank()) return;
        // urlPath p.sh.: /api/guest/files/news/<filename>
        String fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        Path p = Paths.get(uploadDir + fileName); // uploadDir = "uploads/news/"
        try {
            Files.deleteIfExists(p);
        } catch (IOException e) {
            // log nëse dëshiron; nuk e ndalojmë procesin e update
        }
    }

    private List<String> normalizeToRelativeApiPaths(List<String> urlsOrPaths) {
        if (urlsOrPaths == null || urlsOrPaths.isEmpty()) return List.of();
        List<String> out = new ArrayList<>(urlsOrPaths.size());
        for (String s : urlsOrPaths) {
            if (s == null || s.isBlank()) continue;
            out.add(toRelativeApiPath(s));
        }
        return out;
    }

    private String toRelativeApiPath(String any) {
        // Kthen gjithmonë diçka si: /api/guest/files/news/<filename>
        try {
            java.net.URI uri = java.net.URI.create(any);
            String p = uri.getPath(); // p.sh. "/api/guest/files/news/abc.jpg"
            String marker = "/api/guest/files/news/";
            int idx = p.indexOf(marker);
            if (idx >= 0) return p.substring(idx);
            return p; // nëse s’gjen marker-in, kthe path-in siç është
        } catch (Exception e) {
            return any;
        }
    }

    private String toSlug(String input) {
        String noWhiteSpace = Pattern.compile("\\s").matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        String slug = Pattern.compile("[^\\w-]").matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}
