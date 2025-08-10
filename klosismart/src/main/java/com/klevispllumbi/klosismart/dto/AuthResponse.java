package com.klevispllumbi.klosismart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private final String message;
    private final String role;
    private final String token;
}