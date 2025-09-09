package com.klevispllumbi.klosismart.service;

import com.klevispllumbi.klosismart.dto.OptionDto;
import com.klevispllumbi.klosismart.dto.QuestionDto;
import com.klevispllumbi.klosismart.dto.SurveyDto;
import com.klevispllumbi.klosismart.model.Option;
import com.klevispllumbi.klosismart.model.Question;
import com.klevispllumbi.klosismart.model.Survey;
import com.klevispllumbi.klosismart.model.SurveyStatus;
import com.klevispllumbi.klosismart.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final FileStorageService fileStorageService;

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

        surveyRepository.save(survey);
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
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pyetësori nuk u gjet"));

        survey.setTitle(surveyDto.title());
        survey.setDescription(surveyDto.description());
        survey.setEndDate(surveyDto.endDate());
        survey.setStatus(surveyDto.status());

        // Vetëm nëse vjen file i ri, përpunojmë imazhin dhe e vendosim url-në
        if (file != null && !file.isEmpty()) {
            String existingImageUrl = survey.getImageUrl();
            fileStorageService.deleteSurveyImage(existingImageUrl);
            // Ruaj imazhin në disk ose cloud dhe merr URL-në e re
            String newImageUrl = fileStorageService.saveSurveyImage(file); // ose metoda që ke
            survey.setImageUrl(newImageUrl);
        }
        // Nëse nuk ka file të ri, mbajmë URL ekzistuese

        survey.getQuestions().clear();
        surveyDto.questions().forEach(questionDto -> {
            Question question = new Question();
            question.setText(questionDto.text());
            question.setType(questionDto.type());
            question.setSurvey(survey);

            questionDto.options().forEach(optionDto -> {
                Option option = new Option();
                option.setText(optionDto.text());
                option.setQuestion(question);
                question.getOptions().add(option);
            });

            survey.getQuestions().add(question);
        });

        Survey updated = surveyRepository.save(survey);
        return mapToDto(updated);
    }
}
