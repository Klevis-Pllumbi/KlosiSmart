package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.AnswerDto;
import com.klevispllumbi.klosismart.dto.ResponseDto;
import com.klevispllumbi.klosismart.model.*;
import com.klevispllumbi.klosismart.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ResponseService {

    private final ResponseRepository responseRepository;
    private final SurveyRepository surveyRepository;
    private final QuestionRepository questionRepository;

    @Transactional
    public Response submitResponse(User user, ResponseDto responseDto) {
        Survey survey = surveyRepository.findById(responseDto.surveyId())
                .orElseThrow(() -> new EntityNotFoundException("Pyetësori nuk u gjet"));

        Response response = new Response();
        response.setUser(user);
        response.setSurvey(survey);

        for (AnswerDto dto : responseDto.answers()) {
            Question question = questionRepository.findById(dto.questionId())
                    .orElseThrow(() -> new EntityNotFoundException("Pyetja nuk u gjet"));

            Answer answer = new Answer();
            answer.setQuestion(question);
            answer.setSelectedOptionIds(dto.selectedOptionIds() != null ? dto.selectedOptionIds() : new java.util.ArrayList<>());
            answer.setOpenText(dto.openAnswer());
            answer.setResponse(response);

            response.getAnswers().add(answer);
        }

        return responseRepository.save(response);
    }

}
