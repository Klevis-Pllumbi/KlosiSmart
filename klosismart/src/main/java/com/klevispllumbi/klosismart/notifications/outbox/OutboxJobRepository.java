package com.klevispllumbi.klosismart.notifications.outbox;

import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OutboxJobRepository extends JpaRepository<OutboxJob, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
      SELECT j FROM OutboxJob j
      WHERE j.status = 'PENDING' AND j.nextRunAt <= :now
      ORDER BY j.createdAt
      """)
    List<OutboxJob> lockDueJobs(@Param("now") LocalDateTime now, Pageable pageable);
}

