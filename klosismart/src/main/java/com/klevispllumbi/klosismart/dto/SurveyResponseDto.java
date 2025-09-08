package com.klevispllumbi.klosismart.dto;


import jakarta.validation.constraints.NotNull;
import java.util.List;

public record SurveyResponseDto(
        @NotNull(message = "ID e pyetësorit është e detyrueshme")
        Long surveyId,

        @NotNull(message = "Përgjigjet nuk mund të jenë bosh")
        List<AnswerDto> answers
) {}
