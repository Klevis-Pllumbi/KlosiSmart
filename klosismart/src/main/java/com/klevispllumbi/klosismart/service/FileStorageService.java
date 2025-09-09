package com.klevispllumbi.klosismart.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path root = Paths.get("uploads/surveys");

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private static final List<String> ALLOWED_TYPES = List.of("image/jpeg", "image/png", "image/gif", "image/webp");

    public String saveSurveyImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File-i është bosh.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File-i është shumë i madh. Maksimumi 5MB.");
        }

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new RuntimeException("File-i duhet të jetë një imazh i vlefshëm (jpg, png, gif, webp).");
        }

        try {
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destination = root.resolve(filename);
            Files.copy(file.getInputStream(), destination);

            return "/uploads/surveys/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("Nuk u ruajt dot file-i: " + e.getMessage());
        }
    }

    public void deleteSurveyImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) return;

        try {
            String relativePath = imageUrl.replaceFirst("^/", ""); // heq "/" fillestare
            Path filePath = Paths.get("").resolve(relativePath); // relative ndaj backend folder
            Files.deleteIfExists(filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

