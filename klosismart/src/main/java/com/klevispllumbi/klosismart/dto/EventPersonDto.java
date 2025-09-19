// EventPersonDto.java
package com.klevispllumbi.klosismart.dto;

import com.klevispllumbi.klosismart.model.PersonType;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class EventPersonDto {
    private Integer orderIndex;
    private String name;
    private String role;
    private PersonType type;
    private String photoUrl;
}
