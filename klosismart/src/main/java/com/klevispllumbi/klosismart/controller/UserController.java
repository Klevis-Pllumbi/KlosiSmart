package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> profile(@AuthenticationPrincipal User user) {
        Map<String, Object> res = new HashMap<>();
        res.put("email", user.getEmail());
        res.put("role", user.getRole().getAuthority());
        return ResponseEntity.ok(res);
    }
}
