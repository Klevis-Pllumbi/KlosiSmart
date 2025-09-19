package com.klevispllumbi.klosismart.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/guest/files/events")
public class EventsFileController {

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/events/";

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = "application/octet-stream";
            String lower = fileName.toLowerCase();
            if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) contentType = "image/jpeg";
            else if (lower.endsWith(".png")) contentType = "image/png";
            else if (lower.endsWith(".gif")) contentType = "image/gif";
            else if (lower.endsWith(".pdf")) contentType = "application/pdf";
            else if (lower.endsWith(".doc")) contentType = "application/msword";
            else if (lower.endsWith(".docx")) contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    // inline => shfaq direkt në browser (jo detyrim download)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
