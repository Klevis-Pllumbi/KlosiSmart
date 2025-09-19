package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.RequestCreateDto;
import com.klevispllumbi.klosismart.dto.RequestDto;
import com.klevispllumbi.klosismart.model.RequestStatus;
import com.klevispllumbi.klosismart.model.User;
import com.klevispllumbi.klosismart.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/user/requests")
    public ResponseEntity<RequestDto> createRequest(
            @ModelAttribute RequestCreateDto dto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(requestService.createRequest(dto, user));
    }

    @GetMapping("/admin/requests")
    public ResponseEntity<List<RequestDto>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/admin/requests/status/{status}")
    public ResponseEntity<List<RequestDto>> getRequestsByStatus(@PathVariable RequestStatus status) {
        return ResponseEntity.ok(requestService.getRequestsByStatus(status));
    }

    @GetMapping("/admin/requests/{id}")
    public ResponseEntity<RequestDto> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PatchMapping("/admin/requests/{id}/status")
    public ResponseEntity<RequestDto> updateRequestStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String statusStr = body.get("status");
        if (statusStr == null) {
            return ResponseEntity.badRequest().build();
        }

        RequestDto updatedRequest = requestService.updateRequestStatus(id, statusStr);
        return ResponseEntity.ok(updatedRequest);
    }

}
