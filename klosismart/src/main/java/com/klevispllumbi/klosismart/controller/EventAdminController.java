// EventAdminController.java
package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.EventDto;
import com.klevispllumbi.klosismart.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
@RequiredArgsConstructor
public class EventAdminController {

    private final EventService eventService;

    @PostMapping(consumes = {"multipart/form-data"})
    public EventDto create(
            @Valid @ModelAttribute EventDto dto
    ) {
        return eventService.create(dto);
    }

    @PutMapping(value = "/{slug}", consumes = {"multipart/form-data"})
    public EventDto update(
            @PathVariable String slug,
            @ModelAttribute EventDto dto,
            @RequestParam(defaultValue = "false") boolean removeMainImage,
            @RequestParam(required = false) List<String> deleteImages,
            @RequestParam(required = false) List<String> deleteDocuments
    ) {
        return eventService.update(slug, dto, removeMainImage, deleteImages, deleteDocuments);
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Void> delete(@PathVariable String slug) {
        eventService.deleteBySlug(slug);
        return ResponseEntity.noContent().build();
    }
}
