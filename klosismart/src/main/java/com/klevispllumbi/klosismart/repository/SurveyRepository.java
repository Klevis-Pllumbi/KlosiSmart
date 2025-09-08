package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.Survey;
import com.klevispllumbi.klosismart.model.SurveyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    @Query("SELECT s FROM Survey s WHERE s.status <> :status AND s.endDate > :now")
    List<Survey> findActiveSurveys(@Param("status") SurveyStatus status, @Param("now") LocalDateTime now);
}
