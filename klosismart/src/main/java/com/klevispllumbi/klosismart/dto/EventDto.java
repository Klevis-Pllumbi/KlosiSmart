// EventDto.java
package com.klevispllumbi.klosismart.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EventDto {
    private Long id;

    @NotBlank(message = "Titulli nuk mund të jetë bosh")
    private String title;

    @NotBlank(message = "Përmbledhja nuk mund të jetë bosh")
    private String summary;

    @NotBlank(message = "Përmbajtja nuk mund të jetë bosh")
    private String content;

    private String slug;

    @NotNull(message = "Data e fillimit është e detyrueshme")
    private LocalDateTime startAt;

    @NotNull(message = "Data e mbarimit është e detyrueshme")
    private LocalDateTime endAt;

    // Vendndodhja
    private String locationName;
    private String locationAddress;
    private String locationUrl;
    private Double mapLat;
    private Double mapLng;

    // Media kryesore
    @NotNull(message = "Imazhi kryesor është i detyrueshëm")
    private MultipartFile mainImage; // për krijim/update
    private String mainImageUrl;     // për lexim

    // Galeria & dokumentet
    private List<MultipartFile> images;
    private List<MultipartFile> documents;

    private List<String> imageUrls;    // për lexim
    private List<String> documentUrls; // për lexim

    // Agjenda & Personat
    private List<EventActionDto> actions;
    private List<EventPersonDto> persons;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
