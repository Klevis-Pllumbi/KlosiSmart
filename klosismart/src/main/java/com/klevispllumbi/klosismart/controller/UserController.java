package com.klevispllumbi.klosismart.controller;

import com.klevispllumbi.klosismart.model.User;
import com.klevispllumbi.klosismart.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> profile(@AuthenticationPrincipal User user) {
        Map<String, Object> res = new HashMap<>();
        res.put("email", user.getEmail());
        res.put("fullName", user.getName() + " " + user.getSurname());
        res.put("name", user.getName());
        res.put("surname", user.getSurname());
        res.put("nid", user.getNid());
        res.put("role", user.getRole().getAuthority());
        res.put("isSubscribed", user.isSubscribed());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/subscription/toggle")
    public boolean toggleSubscription(@AuthenticationPrincipal User user) {
        return userService.toggleSubscription(user);
    }

}
