package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.Request;
import com.klevispllumbi.klosismart.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByStatus(RequestStatus status);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    long countByStatusAndCreatedAtBetween(RequestStatus status, LocalDateTime start, LocalDateTime end);
}
