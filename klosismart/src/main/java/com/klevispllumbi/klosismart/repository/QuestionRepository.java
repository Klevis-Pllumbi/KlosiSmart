package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
