package com.klevispllumbi.klosismart.notifications.outbox;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

// notifications/outbox/OutboxJob.java
@Entity
@Getter
@Setter
@NoArgsConstructor
public class OutboxJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false) private String type;         // NEWS_CREATED / EVENT_CREATED / SURVEY_CREATED
    @Lob @Column(nullable=false) private String payloadJson;

    @Column(nullable=false) private String status = "PENDING";
    @Column(nullable=false) private int attempts = 0;

    @Column(nullable=false) private LocalDateTime nextRunAt = LocalDateTime.now();
    @Lob private String lastError;

    @Column(nullable=false) private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable=false) private LocalDateTime updatedAt = LocalDateTime.now();
}

