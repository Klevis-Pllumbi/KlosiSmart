package com.klevispllumbi.klosismart.notifications.dto;

import lombok.*;

// notifications/dto/BroadcastPayload.java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BroadcastPayload {
    private String template;   // p.sh. "broadcast-email" (html file pa .html)
    private String subject;    // subjekti për të gjithë
    private String message;    // paragrafi kryesor
    private String buttonText; // teksti i butonit (p.sh. "Lexo më shumë")
    private String buttonUrl;  // url CTA
}
