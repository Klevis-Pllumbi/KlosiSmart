package com.klevispllumbi.klosismart.dto;

import jakarta.validation.constraints.NotBlank;

public record OptionDto(
        Long id,

        @NotBlank(message = "Teksti i opsionit është i detyrueshëm")
        String text
) {}
