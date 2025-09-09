package com.klevispllumbi.klosismart.dto;

import java.util.List;

public record QuestionResultDto(
        Long questionId,
        String text,
        String type,
        List<OptionResultDto> options,
        List<String> openAnswers
) {}
