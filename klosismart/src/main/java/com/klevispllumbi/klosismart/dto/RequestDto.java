package com.klevispllumbi.klosismart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    private String userEmail;
    private String userName;
    private List<String> imageUrls;
    private List<String> documentUrls;

}

