package com.klevispllumbi.klosismart.repository;

import com.klevispllumbi.klosismart.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    boolean existsByQuestionId(Long questionId);

    // selectedOptionIds is an @ElementCollection<List<Long>>
    @Query("""
        select case when count(a)>0 then true else false end
        from Answer a
        where a.question.id = :questionId
          and :optionId member of a.selectedOptionIds
    """)
    boolean existsByQuestionIdAndSelectedOptionId(@Param("questionId") Long questionId,
                                                  @Param("optionId") Long optionId);
}
