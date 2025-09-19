// EventGuestController.java
package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.EventDto;
import com.klevispllumbi.klosismart.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.*;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/guest/events")
@RequiredArgsConstructor
public class EventGuestController {

    private final EventService eventService;

    @GetMapping
    public Page<EventDto> list(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String q,
            @RequestParam(required = false, defaultValue = "false") boolean upcoming
    ) {
        return eventService.getAll(page, size, q, upcoming);
    }

    @GetMapping("/{slug}")
    public EventDto bySlug(@PathVariable String slug) {
        return eventService.getBySlug(slug);
    }

    // Serving files: /api/guest/files/events/{filename}
    @GetMapping("/../files/events/{filename:.+}")
    public ResponseEntity<Resource> serve(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads/events/" + filename);
            if (!Files.exists(file)) return ResponseEntity.notFound().build();
            Resource res = new FileSystemResource(file);
            MediaType mt = MediaType.APPLICATION_OCTET_STREAM;
            try {
                String probe = Files.probeContentType(file);
                if (probe != null) mt = MediaType.parseMediaType(probe);
            } catch (Exception ignored) {}
            return ResponseEntity.ok()
                    .contentType(mt)
                    .body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
