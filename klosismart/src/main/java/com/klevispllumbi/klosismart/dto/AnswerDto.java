package com.klevispllumbi.klosismart.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public record AnswerDto(
        @NotNull(message = "ID e pyetjes është e detyrueshme")
        Long questionId,

        List<Long> selectedOptionIds, // për MULTIPLE_CHOICE

        String openAnswer              // për OPEN_TEXT
) {}
