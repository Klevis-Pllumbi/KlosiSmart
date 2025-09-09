package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.ResponseDto;
import com.klevispllumbi.klosismart.model.Response;
import com.klevispllumbi.klosismart.model.User;
import com.klevispllumbi.klosismart.service.ResponseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ResponseController {

    private final ResponseService responseService;

    @PostMapping("/user/responses")
    public ResponseEntity<Response> submitSurveyResponse(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ResponseDto responseDto
    ) {
        Response response = responseService.submitResponse(user, responseDto);
        return ResponseEntity.ok(response);
    }
}
