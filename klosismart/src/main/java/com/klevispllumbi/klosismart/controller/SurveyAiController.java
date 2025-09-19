
package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.AiSurveyGenerateRequest;
import com.klevispllumbi.klosismart.dto.SurveyDto;
import com.klevispllumbi.klosismart.service.SurveyAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// SurveyAiController.java
@RestController
@RequestMapping("/api/admin/surveys")
public class SurveyAiController {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SurveyAiController.class);
    private final SurveyAiService ai;

    public SurveyAiController(SurveyAiService ai) { this.ai = ai; }

    @PostMapping("/ai-generate")
    public ResponseEntity<?> generate(@RequestBody AiSurveyGenerateRequest req) {
        try {
            SurveyDto dto = ai.generateToSurveyDto(req);
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            log.warn("Bad request in ai-generate: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Internal error in ai-generate", e);
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}

