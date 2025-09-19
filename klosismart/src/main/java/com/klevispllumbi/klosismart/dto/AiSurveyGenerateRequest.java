package com.klevispllumbi.klosismart.dto;

public record AiSurveyGenerateRequest(
        String brief,
        Integer maxQuestions,
        Boolean allowOpenText,
        Boolean allowMultipleChoice,
        Boolean allowSingleChoice
) {}