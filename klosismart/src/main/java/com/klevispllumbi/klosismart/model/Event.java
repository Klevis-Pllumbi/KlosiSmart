// Event.java
package com.klevispllumbi.klosismart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT", nullable = false) private String summary;
    @Lob @Column(columnDefinition = "TEXT", nullable = false) private String content;

    @Column(unique = true, nullable = false) private String slug;

    // Datat
    @Column(nullable = false) private LocalDateTime startAt;
    @Column(nullable = false) private LocalDateTime endAt;

    // Vendndodhja
    private String locationName;
    private String locationAddress;
    private String locationUrl;    // p.sh. link Google Maps
    private Double mapLat;
    private Double mapLng;

    // Media kryesore
    private String imageUrl; // /api/guest/files/events/<file>

    // Koleksionet
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventDocument> documents = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<EventAction> actions = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<EventPerson> persons = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist(){
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void preUpdate(){
        updatedAt = LocalDateTime.now();
    }
}
