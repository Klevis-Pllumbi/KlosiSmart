// EventAction.java
package com.klevispllumbi.klosismart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EventAction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer orderIndex;          // renditja në agjendë
    private String title;                // p.sh. “Hapja e eventit”
    @Lob private String description;     // opsionale
    private LocalDateTime scheduledAt;   // opsionale – orari specifik

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;
}
