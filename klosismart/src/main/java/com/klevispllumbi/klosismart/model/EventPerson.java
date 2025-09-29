
package com.klevispllumbi.klosismart.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EventPerson {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer orderIndex; // renditja e kartave të folësve / të ftuarve
    private String name;
    private String role;        // roli në event (moderator, folës, i ftuar)
    @Enumerated(EnumType.STRING)
    private PersonType type;    // SPEAKER / GUEST
    private String photoPath;   // /api/guest/files/events/<file> (opsionale)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;
}
