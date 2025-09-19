package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.NewsDto;
import com.klevispllumbi.klosismart.model.Tag;
import com.klevispllumbi.klosismart.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/guest/news")
    public Page<NewsDto> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String tag
    ) {
        return newsService.getAllNews(page, size, q, tag);
    }

    @PostMapping("/admin/news")
    public NewsDto createNews(@Valid @ModelAttribute NewsDto newsDto) {
        return newsService.createNews(newsDto);
    }

    @GetMapping("/guest/news/{slug}")
    public ResponseEntity<NewsDto> getNewsBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(newsService.getNewsBySlug(slug));
    }

    @PutMapping(value = "/admin/news/{slug}", consumes = {"multipart/form-data"})
    public NewsDto updateNews(
            @PathVariable String slug,
            @ModelAttribute NewsDto dto, // title, summary, content, tags, mainImage, images, documents
            @RequestParam(value = "removeMainImage", required = false, defaultValue = "false") boolean removeMainImage,
            @RequestParam(value = "deleteImages", required = false) List<String> deleteImages,
            @RequestParam(value = "deleteDocuments", required = false) List<String> deleteDocuments
    ) {
        return newsService.updateNews(slug, dto, removeMainImage,
                deleteImages == null ? List.of() : deleteImages,
                deleteDocuments == null ? List.of() : deleteDocuments);
    }

    @DeleteMapping("/admin/news/{slug}")
    public ResponseEntity<Void> deleteNews(@PathVariable String slug) {
        newsService.deleteNewsBySlug(slug);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/guest/news/tags")
    public List<Tag> getAllTags() {
        return Arrays.asList(Tag.values());
    }
}
