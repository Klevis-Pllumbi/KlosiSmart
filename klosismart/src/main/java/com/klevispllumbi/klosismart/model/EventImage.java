// EventImage.java
package com.klevispllumbi.klosismart.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EventImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private String filePath; // /api/guest/files/events/<file>

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;
}
