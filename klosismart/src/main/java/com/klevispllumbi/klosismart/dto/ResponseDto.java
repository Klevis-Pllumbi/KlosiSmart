package com.klevispllumbi.klosismart.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ResponseDto(
        @NotNull(message = "ID e survey është e detyrueshme")
        @Valid
        Long surveyId,

        @NotNull(message = "Duhet të ketë të paktën një përgjigje")
        @Valid
        List<AnswerDto> answers
) {}