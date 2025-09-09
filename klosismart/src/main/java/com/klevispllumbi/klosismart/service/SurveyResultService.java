package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.OptionResultDto;
import com.klevispllumbi.klosismart.dto.QuestionResultDto;
import com.klevispllumbi.klosismart.dto.SurveyResultDto;
import com.klevispllumbi.klosismart.model.Answer;
import com.klevispllumbi.klosismart.model.Question;
import com.klevispllumbi.klosismart.model.Response;
import com.klevispllumbi.klosismart.model.Survey;
import com.klevispllumbi.klosismart.repository.SurveyRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SurveyResultService {

    private final SurveyRepository surveyRepository;

    public SurveyResultService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public SurveyResultDto getSurveyResults(Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new NoSuchElementException("Survey nuk u gjet me ID: " + surveyId));

        List<Response> responses = survey.getResponses();

        List<QuestionResultDto> questionResults = survey.getQuestions().stream().map(q -> {
            QuestionResultDto questionResult;

            if (q.getType().name().equals("OPEN_TEXT")) {
                List<String> openAnswers = responses.stream()
                        .flatMap(r -> r.getAnswers().stream())
                        .filter(a -> a.getQuestion().getId().equals(q.getId()))
                        .map(Answer::getOpenText)
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList());

                questionResult = new QuestionResultDto(
                        q.getId(),
                        q.getText(),
                        q.getType().name(),
                        Collections.emptyList(),
                        openAnswers
                );
            } else { // SINGLE_CHOICE ose MULTIPLE_CHOICE
                List<OptionResultDto> options = q.getOptions().stream().map(opt -> {
                    long count = responses.stream()
                            .flatMap(r -> r.getAnswers().stream())
                            .filter(a -> a.getQuestion().getId().equals(q.getId()))
                            .flatMap(a -> a.getSelectedOptionIds().stream())
                            .filter(id -> id.equals(opt.getId()))
                            .count();
                    return new OptionResultDto(opt.getId(), opt.getText(), count);
                }).collect(Collectors.toList());

                questionResult = new QuestionResultDto(
                        q.getId(),
                        q.getText(),
                        q.getType().name(),
                        options,
                        Collections.emptyList()
                );
            }

            return questionResult;
        }).collect(Collectors.toList());

        return new SurveyResultDto(
                survey.getId(),
                survey.getTitle(),
                questionResults
        );
    }
}
