package com.klevispllumbi.klosismart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String filePath;

    @Enumerated(EnumType.STRING)
    private FileCategory category;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private Request request;
}
