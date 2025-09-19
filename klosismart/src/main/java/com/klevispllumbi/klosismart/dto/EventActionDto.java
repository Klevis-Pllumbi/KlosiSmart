// EventActionDto.java
package com.klevispllumbi.klosismart.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class EventActionDto {
    private Integer orderIndex;
    private String title;
    private String description;
    private LocalDateTime scheduledAt;
}
