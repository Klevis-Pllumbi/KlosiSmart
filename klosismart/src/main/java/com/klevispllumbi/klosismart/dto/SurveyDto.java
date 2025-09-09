package com.klevispllumbi.klosismart.dto;


import com.klevispllumbi.klosismart.model.SurveyStatus;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;

public record SurveyDto(
        Long id,

        @NotBlank(message = "Titulli i pyetësorit është i detyrueshëm")
        String title,

        String description,

        String imageUrl,

        @Future(message = "Data e mbylljes duhet të jetë në të ardhmen")
        LocalDateTime endDate,

        SurveyStatus status, // DRAFT, ACTIVE, CLOSED

        @NotEmpty(message = "Pyetjet nuk mund të jenë bosh")
        List<QuestionDto> questions
) {}
