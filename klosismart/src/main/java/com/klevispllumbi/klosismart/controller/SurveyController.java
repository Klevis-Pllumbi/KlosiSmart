package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.SurveyDto;
import com.klevispllumbi.klosismart.service.SurveyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping("/admin/surveys")
    public ResponseEntity<SurveyDto> createSurvey(@Valid @RequestBody SurveyDto surveyDto) {
        SurveyDto createdSurvey = surveyService.createSurvey(surveyDto);
        return ResponseEntity.ok(createdSurvey);
    }

    @GetMapping("/user/surveys/active")
    public ResponseEntity<List<SurveyDto>> getActiveSurveys() {
        List<SurveyDto> surveys = surveyService.getActiveSurveysForUsers();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/admin/surveys/all")
    public ResponseEntity<List<SurveyDto>> getAllSurveys() {
        List<SurveyDto> surveys = surveyService.getAllSurveysForAdmin();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/user/surveys/{id}")
    public ResponseEntity<SurveyDto> getSurveyById(@PathVariable Long id) {
        SurveyDto survey = surveyService.getSurveyById(id);
        return ResponseEntity.ok(survey);
    }

    @GetMapping("/admin/surveys/{id}")
    public ResponseEntity<SurveyDto> getSurveyForAdminById(@PathVariable Long id) {
        SurveyDto survey = surveyService.getSurveyById(id);
        return ResponseEntity.ok(survey);
    }

    @PutMapping("/admin/surveys/{id}")
    public ResponseEntity<SurveyDto> updateSurvey(@PathVariable Long id,
                                                  @Valid @RequestBody SurveyDto surveyDto) {
        SurveyDto updatedSurvey = surveyService.updateSurvey(id, surveyDto);
        return ResponseEntity.ok(updatedSurvey);
    }

    @DeleteMapping("/admin/surveys/{id}")
    public ResponseEntity<String> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.ok("Pyetësori u fshi me sukses");
    }
}
