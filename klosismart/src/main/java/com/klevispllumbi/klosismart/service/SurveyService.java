package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.OptionDto;
import com.klevispllumbi.klosismart.dto.QuestionDto;
import com.klevispllumbi.klosismart.dto.SurveyDto;
import com.klevispllumbi.klosismart.model.Option;
import com.klevispllumbi.klosismart.model.Question;
import com.klevispllumbi.klosismart.model.Survey;
import com.klevispllumbi.klosismart.model.SurveyStatus;
import com.klevispllumbi.klosismart.notifications.dto.BroadcastPayload;
import com.klevispllumbi.klosismart.notifications.outbox.OutboxService;
import com.klevispllumbi.klosismart.repository.AnswerRepository;
import com.klevispllumbi.klosismart.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final FileStorageService fileStorageService;
    private final AnswerRepository answerRepository;
    private final OutboxService outboxService;

    public SurveyDto createSurvey(SurveyDto surveyDto, MultipartFile file) {
        Survey survey = new Survey();
        survey.setTitle(surveyDto.title());
        survey.setDescription(surveyDto.description());
        survey.setEndDate(surveyDto.endDate());
        survey.setCreatedAt(LocalDateTime.now());
        survey.setStatus(surveyDto.status() != null ? surveyDto.status() : SurveyStatus.DRAFT);

        if (file != null && !file.isEmpty()) {
            String imageUrl = fileStorageService.saveSurveyImage(file);
            survey.setImageUrl(imageUrl);
        }

        survey.setQuestions(
                surveyDto.questions().stream().map(qDto -> {
                    Question question = new Question();
                    question.setText(qDto.text());
                    question.setType(qDto.type());
                    question.setSurvey(survey);

                    if (qDto.options() != null) {
                        question.setOptions(
                                qDto.options().stream().map(oDto -> {
                                    Option option = new Option();
                                    option.setText(oDto.text());
                                    option.setQuestion(question);
                                    return option;
                                }).collect(Collectors.toList())
                        );
                    }
                    return question;
                }).collect(Collectors.toList())
        );

        Survey saved = surveyRepository.save(survey);

        var payload = BroadcastPayload.builder()
                .template("broadcast-email")
                .subject("📣 Pyetësor i ri: " + saved.getTitle())
                .message(saved.getDescription())
                .buttonText("Lexo më shumë")
                .buttonUrl(("http://localhost:3000/surveys/" + saved.getId()))
                .build();
        outboxService.enqueue("SURVEYS_CREATED", payload);

        return mapToDto(survey);
    }

    private SurveyDto mapToDto(Survey survey) {
        return new SurveyDto(
                survey.getId(),
                survey.getTitle(),
                survey.getDescription(),
                survey.getImageUrl(),
                survey.getEndDate(),
                survey.getStatus(),
                survey.getQuestions().stream().map(q ->
                        new QuestionDto(
                                q.getId(),
                                q.getText(),
                                q.getType(),
                                q.getOptions().stream().map(o ->
                                        new OptionDto(o.getId(), o.getText())
                                ).toList()
                        )
                ).toList()
        );
    }

    public List<SurveyDto> getActiveSurveysForUsers() {
        return surveyRepository.findActiveSurveys(
                        SurveyStatus.DRAFT, LocalDateTime.now())
                .stream().map(this::mapToDto)
                .toList();
    }

    public List<SurveyDto> getAllSurveysForAdmin() {
        return surveyRepository.findAll()
                .stream().map(this::mapToDto)
                .toList();
    }

    public SurveyDto getSurveyById(Long id) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pyetësori nuk u gjet"));
        return mapToDto(survey);
    }

    public void deleteSurvey(Long id) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pyetësori nuk u gjet"));

        String imageUrl = survey.getImageUrl();
        fileStorageService.deleteSurveyImage(imageUrl);

        surveyRepository.deleteById(id);
    }

    @Transactional
    public SurveyDto updateSurvey(Long id, SurveyDto surveyDto, MultipartFile file) {
        // LAZY-safe because we are inside a transaction
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pyetësori nuk u gjet"));

        survey.setTitle(surveyDto.title());
        survey.setDescription(surveyDto.description());
        survey.setEndDate(surveyDto.endDate());
        survey.setStatus(surveyDto.status());

        if (file != null && !file.isEmpty()) {
            String existingImageUrl = survey.getImageUrl();
            fileStorageService.deleteSurveyImage(existingImageUrl);
            String newImageUrl = fileStorageService.saveSurveyImage(file);
            survey.setImageUrl(newImageUrl);
        }

        // Build map of existing questions (LAZY collection; safe in TX)
        Map<Long, Question> existingQ = survey.getQuestions().stream()
                .filter(q -> q.getId() != null)
                .collect(Collectors.toMap(Question::getId, Function.identity()));

        Set<Long> seenQuestionIds = new HashSet<>();

        for (QuestionDto qd : surveyDto.questions()) {
            if (qd.id() != null && existingQ.containsKey(qd.id())) {
                // update existing
                Question q = existingQ.get(qd.id());
                boolean hasAnswers = answerRepository.existsByQuestionId(q.getId());

                if (hasAnswers && q.getType() != qd.type()) {
                    throw new IllegalStateException("Nuk lejohet të ndryshohet tipi i pyetjes pasi ka përgjigje.");
                }

                q.setText(qd.text());
                if (!hasAnswers) q.setType(qd.type());

                // Touch q.getOptions() during reconcile; with SUBSELECT this will bulk-load them
                reconcileOptions(q, qd, hasAnswers);
                seenQuestionIds.add(q.getId());
            } else {
                // new question
                Question q = new Question();
                q.setSurvey(survey);
                q.setText(qd.text());
                q.setType(qd.type());
                q.setOptions(new ArrayList<>());

                for (OptionDto od : qd.options()) {
                    Option o = new Option();
                    o.setQuestion(q);
                    o.setText(od.text());
                    q.getOptions().add(o);
                }
                survey.getQuestions().add(q);
            }
        }

        // Remove questions absent from DTO (only if no answers)
        List<Question> toCheckDelete = new ArrayList<>(survey.getQuestions());
        for (Question q : toCheckDelete) {
            if (q.getId() != null && !seenQuestionIds.contains(q.getId())) {
                if (answerRepository.existsByQuestionId(q.getId())) {
                    throw new RuntimeException("Nuk lejohet fshirja e pyetjes pasi ka përgjigje.");
                }
                survey.getQuestions().remove(q);
            }
        }

        Survey saved = surveyRepository.save(survey);
        return mapToDto(saved);
    }

    private void reconcileOptions(Question q, QuestionDto qd, boolean hasAnswers) {
        // q.getOptions() is LAZY; within TX + SUBSELECT/BatchSize it will be efficient
        Map<Long, Option> existingO = q.getOptions().stream()
                .filter(o -> o.getId() != null)
                .collect(Collectors.toMap(Option::getId, Function.identity()));

        Set<Long> seenOptionIds = new HashSet<>();

        for (OptionDto od : qd.options()) {
            if (od.id() != null && existingO.containsKey(od.id())) {
                Option o = existingO.get(od.id());
                o.setText(od.text());
                seenOptionIds.add(o.getId());
            } else {
                Option o = new Option();
                o.setQuestion(q);
                o.setText(od.text());
                q.getOptions().add(o);
            }
        }

        List<Option> toCheckDelete = new ArrayList<>(q.getOptions());
        for (Option o : toCheckDelete) {
            if (o.getId() != null && !seenOptionIds.contains(o.getId())) {
                if (hasAnswers && answerRepository
                        .existsByQuestionIdAndSelectedOptionId(q.getId(), o.getId())) {
                    throw new IllegalStateException("Nuk mund të fshihet një alternativë që është zgjedhur nga përdoruesit.");
                }
                q.getOptions().remove(o);
            }
        }
    }


}
