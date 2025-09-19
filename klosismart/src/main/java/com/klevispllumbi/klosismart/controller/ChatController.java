package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.service.OpenAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user/chat")
public class ChatController {

    private final OpenAiService openAiService;

    public ChatController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String sessionId = request.get("sessionId");
        if (userMessage == null || userMessage.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("response", "Ju lutemi shkruani një pyetje."));
        }

        String botResponse = openAiService.askQuestion(sessionId, userMessage);
        return ResponseEntity.ok(Map.of("response", botResponse));
    }
}

