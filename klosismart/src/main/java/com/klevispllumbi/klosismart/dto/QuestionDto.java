package com.klevispllumbi.klosismart.dto;


import com.klevispllumbi.klosismart.model.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record QuestionDto(
        Long id,

        @NotBlank(message = "Teksti i pyetjes është i detyrueshëm")
        String text,

        @NotNull(message = "Tipi i pyetjes duhet të specifikohet")
        QuestionType type, // SINGLE_CHOICE, MULTIPLE_CHOICE, OPEN

        List<OptionDto> options // mund të jetë bosh për OPEN_TEXT
) {}
