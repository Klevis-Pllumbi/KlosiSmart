package com.klevispllumbi.klosismart.notifications.outbox;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// notifications/outbox/OutboxService.java
@Service
@RequiredArgsConstructor
public class OutboxService {
    private final OutboxJobRepository repo;
    private final ObjectMapper om;

    @Transactional
    public void enqueue(String type, Object payload) {
        OutboxJob j = new OutboxJob();
        j.setType(type);
        try {
            j.setPayloadJson(om.writeValueAsString(payload));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        repo.save(j); // ruhet në të njëjtin transaksion me krijimin e lajmit/eventit
    }
}
