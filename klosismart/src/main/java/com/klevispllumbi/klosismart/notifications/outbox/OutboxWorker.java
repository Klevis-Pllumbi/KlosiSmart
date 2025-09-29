package com.klevispllumbi.klosismart.notifications.outbox;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.klevispllumbi.klosismart.notifications.dto.BroadcastPayload;
import com.klevispllumbi.klosismart.notifications.email.BulkEmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

// notifications/outbox/OutboxWorker.java
@Service
@RequiredArgsConstructor
public class OutboxWorker {
    private final OutboxJobRepository repo;
    private final BulkEmailService bulkEmail;
    private final ObjectMapper om;

    // konfigurime të lehta
    private static final int PAGE = 5;            // sa job-e për tick
    private static final int BATCH_SIZE = 300;    // sa marrës per parti
    private static final Duration BACKOFF = Duration.ofMinutes(5);

    @Scheduled(fixedDelay = 60000) // çdo 5s
    @Transactional
    public void tick() {
        var due = repo.lockDueJobs(LocalDateTime.now(), PageRequest.of(0, PAGE));
        for (OutboxJob j : due) {
            j.setStatus("PROCESSING");
            j.setUpdatedAt(LocalDateTime.now());
        }
        // flush status PROCESSING brenda këtij transaksioni
    }

    // Pas flush-it, lexojmë jashtë transaksionit për të dërguar (që të mos bllokojmë)
    @Scheduled(fixedDelay = 5000, initialDelay = 1000)
    public void process() {
        List<OutboxJob> processing = repo.findAll().stream()
                .filter(x -> "PROCESSING".equals(x.getStatus())).limit(PAGE).toList();
        for (OutboxJob j : processing) handleOne(j);
    }

    @Transactional
    protected void handleOne(OutboxJob j) {
        try {
            BroadcastPayload payload = om.readValue(j.getPayloadJson(), BroadcastPayload.class);
            bulkEmail.broadcast(payload, BATCH_SIZE); // dërgim me batch-e
            j.setStatus("DONE");
            j.setUpdatedAt(LocalDateTime.now());
            repo.save(j);
        } catch (Exception ex) {
            j.setAttempts(j.getAttempts() + 1);
            j.setLastError(ex.getMessage());
            j.setStatus("PENDING");
            j.setNextRunAt(LocalDateTime.now().plus(BACKOFF.multipliedBy(Math.max(1, j.getAttempts()))));
            j.setUpdatedAt(LocalDateTime.now());
            repo.save(j);
        }
    }
}

