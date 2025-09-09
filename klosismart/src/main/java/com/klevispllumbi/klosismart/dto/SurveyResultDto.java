package com.klevispllumbi.klosismart.dto;

import java.util.List;

public record SurveyResultDto(
        Long surveyId,
        String surveyTitle,
        List<QuestionResultDto> questions
) {}
