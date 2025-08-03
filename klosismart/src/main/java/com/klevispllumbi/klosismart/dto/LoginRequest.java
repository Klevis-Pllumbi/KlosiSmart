package com.klevispllumbi.klosismart.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @Email(message = "Email i pasaktë")
    @NotBlank(message = "Email është i detyrueshëm")
    private String email;

    @NotBlank(message = "Password është i detyrueshëm")
    private String password;

}