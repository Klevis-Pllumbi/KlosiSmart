package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.dto.*;
import com.klevispllumbi.klosismart.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/verify")
    public void verifyUser(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        boolean verified = authService.verifyUser(token);

        if (verified) {
            response.sendRedirect("http://localhost:3000/email-verified?status=success");
        } else {
            response.sendRedirect("http://localhost:3000/email-verified?status=error");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        AuthResponse authResponse = authService.login(request);

        Cookie cookie = new Cookie("jwt", authResponse.getToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false);     // true në prodhim (me HTTPS)
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 30);

        response.addCookie(cookie);

        Map<String, Object> body = new HashMap<>();
        body.put("message", authResponse.getMessage());
        body.put("role", authResponse.getRole());
        body.put("username", request.getEmail());

        return ResponseEntity.ok(body);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        authService.forgotPassword(request.get("email"));
        return ResponseEntity.ok(Map.of("message", "Do të merrni një link për të ndryshuar fjalëkalimin në email-in e dhënë."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        authService.resetPassword(request.get("token"), request.get("newPassword"));
        return ResponseEntity.ok(Map.of("message", "Fjalëkalimi u ndryshua me sukses. Kthehu tek Login"));
    }

}