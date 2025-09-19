// EventRepository.java
package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {
    Optional<Event> findBySlug(String slug);
    boolean existsBySlug(String slug);
    @Query("""
      SELECT e FROM Event e
      WHERE (e.endAt IS NOT NULL AND e.endAt >= :now)
         OR (e.endAt IS NULL AND e.startAt >= :now)
      """)
    Page<Event> findUpcoming(@Param("now") LocalDateTime now, Pageable pageable);

    @Query("""
      SELECT e FROM Event e
      WHERE ((e.endAt IS NOT NULL AND e.endAt >= :now)
          OR (e.endAt IS NULL AND e.startAt >= :now))
        AND (LOWER(e.title) LIKE LOWER(CONCAT('%', :q, '%'))
          OR LOWER(e.summary) LIKE LOWER(CONCAT('%', :q, '%')))
      """)
    Page<Event> findUpcomingByQuery(@Param("now") LocalDateTime now,
                                    @Param("q") String q,
                                    Pageable pageable);
}
