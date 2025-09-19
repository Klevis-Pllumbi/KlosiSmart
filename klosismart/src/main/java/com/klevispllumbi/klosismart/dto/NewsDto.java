package com.klevispllumbi.klosismart.dto;

import com.klevispllumbi.klosismart.model.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewsDto {

    private Long id;

    @NotBlank(message = "Titulli nuk mund të jetë bosh")
    private String title;

    @NotBlank(message = "Përmbajtja nuk mund të jetë bosh")
    private String content;

    @NotBlank(message = "Duhet vendosur një përmbledhje me 1 fjali të shkurtër")
    private String summary;

    private String slug;

    @NotNull(message = "Imazhi kryesor është i detyrueshëm")
    private MultipartFile mainImage;

    private String mainImageUrl;

    private List<MultipartFile> images;
    private List<MultipartFile> documents;

    private List<String> imageUrls;
    private List<String> documentUrls;

    @NotNull(message = "Duhet të zgjidhet së paku një tag")
    private List<Tag> tags;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
