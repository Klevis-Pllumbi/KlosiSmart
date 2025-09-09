package com.klevispllumbi.klosismart.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record OptionDto(
        Long id,

        @NotBlank(message = "Teksti i opsionit është i detyrueshëm")
        @Valid
        String text
) {}
