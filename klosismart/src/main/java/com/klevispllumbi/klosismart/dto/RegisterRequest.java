package com.klevispllumbi.klosismart.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Emri është i detyrueshëm")
    private String name;

    @Email(message = "Email i pasaktë")
    @NotBlank(message = "Email është i detyrueshëm")
    private String email;

    @NotBlank(message = "Password është i detyrueshëm")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&.,:'\\-=]{8,}$",
            message = "Fjalëkalimi duhet të ketë të paktën 8 karaktere, një shkronjë të madhe, një shkronjë të vogël, një numër dhe një simbol special"
    )
    private String password;

}