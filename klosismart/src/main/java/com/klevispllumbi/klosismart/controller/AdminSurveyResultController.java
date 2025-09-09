package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.SurveyResultDto;
import com.klevispllumbi.klosismart.service.SurveyResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/surveys")
public class AdminSurveyResultController {

    private final SurveyResultService surveyResultService;

    public AdminSurveyResultController(SurveyResultService surveyResultService) {
        this.surveyResultService = surveyResultService;
    }

    @GetMapping("/{surveyId}/results")
    public ResponseEntity<SurveyResultDto> getSurveyResults(@PathVariable Long surveyId) {
        SurveyResultDto result = surveyResultService.getSurveyResults(surveyId);
        return ResponseEntity.ok(result);
    }
}
