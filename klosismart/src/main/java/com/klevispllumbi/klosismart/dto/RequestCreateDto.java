package com.klevispllumbi.klosismart.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestCreateDto {

    private String title;
    private String description;
    private Double latitude;
    private Double longitude;
    private List<MultipartFile> files;

}
