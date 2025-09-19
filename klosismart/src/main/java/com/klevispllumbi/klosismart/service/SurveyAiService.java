package com.klevispllumbi.klosismart.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.klevispllumbi.klosismart.dto.AiSurveyGenerateRequest;
import com.klevispllumbi.klosismart.dto.OptionDto;
import com.klevispllumbi.klosismart.dto.QuestionDto;
import com.klevispllumbi.klosismart.dto.SurveyDto;
import com.klevispllumbi.klosismart.model.QuestionType;
import com.klevispllumbi.klosismart.model.SurveyStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SurveyAiService {

    private static final Logger log = LoggerFactory.getLogger(SurveyAiService.class);

    private static final String OPENAI_URL = "https://api.openai.com/v1/responses";
    private static final String MODEL = "gpt-4o-2024-08-06"; // ose "gpt-4o-mini" për testime më të lira

    private final String apiKey = System.getenv("OPENAI_API_KEY");

    private final RestTemplate rest;
    private final ObjectMapper om = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    public SurveyAiService() {
        // RestTemplate me timeout-e të arsyeshme
        SimpleClientHttpRequestFactory rf = new SimpleClientHttpRequestFactory();
        rf.setConnectTimeout(10_000);
        rf.setReadTimeout(60_000);
        this.rest = new RestTemplate(rf);
    }

    // JSON Schema për Structured Outputs – ENUM me OPEN_TEXT siç e kërkon frontend/DTO
    private static final String SCHEMA = """
{
  "type": "object",
  "title": "SurveyDraft",
  "additionalProperties": false,
  "properties": {
    "title": { "type": "string" },
    "description": { "type": "string" },
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["text","type","options"],
        "properties": {
          "text": { "type": "string" },
          "type": { "type": "string", "enum": ["SINGLE_CHOICE","MULTIPLE_CHOICE","OPEN_TEXT"] },
          "options": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": ["text"],
              "properties": {
                "text": { "type": "string" }
              }
            }
          }
        }
      }
    }
  },
  "required": ["title","description","questions"]
}
""";

    public SurveyDto generateToSurveyDto(AiSurveyGenerateRequest req) throws Exception {
        // 1) Sanity checks
        if (apiKey == null || apiKey.isBlank()) {
            log.error("OPENAI_API_KEY mungon ose bosh.");
            throw new IllegalStateException("OPENAI_API_KEY mungon në environment.");
        }
        if (req == null || req.brief() == null || req.brief().isBlank()) {
            throw new IllegalArgumentException("Brief është i detyrueshëm.");
        }

        // 2) Parametra logjikë
        int maxQ = (req.maxQuestions() == null) ? 8 : Math.max(3, Math.min(req.maxQuestions(), 20));
        boolean allowOpen   = req.allowOpenText() == null ? true : req.allowOpenText();
        boolean allowMulti  = req.allowMultipleChoice() == null ? true : req.allowMultipleChoice();
        boolean allowSingle = req.allowSingleChoice() == null ? true : req.allowSingleChoice();

        String guardrails = """
            Je një asistent që gjeneron PYETËSORË në gjuhën shqipe për qytetarët.
            KTHE VETËM JSON sipas skemës SurveyDraft. Asnjë tekst jashtë JSON-it.
            UDHËZIME:
            - Titull i shkurtër dhe përshkrim orientues.
            - Gjenero rreth %d pyetje (±2).
            - Përdor vetëm llojet e lejuara:
              SINGLE_CHOICE: %s
              MULTIPLE_CHOICE: %s
              OPEN_TEXT: %s
            - Për SINGLE_CHOICE/MULTIPLE_CHOICE vendos ≥3 opsione kuptimplota (pa dublime).
            - Për OPEN_TEXT vendos options=[].
            - Shmang pyetje të dyfishta; një ide për pyetje.
            - Fokus: matje e përvojës, aksesit, cilësisë së shërbimit, transparencës dhe sugjerimeve.
        """.formatted(
                maxQ,
                allowSingle ? "PO" : "JO",
                allowMulti ? "PO" : "JO",
                allowOpen  ? "PO" : "JO"
        );

        // 3) Trupë kërkese sipas Responses API + Structured Outputs
        Map<String, Object> schemaMap = om.readValue(SCHEMA, new TypeReference<>() {});
        Map<String, Object> body = Map.of(
                "model", MODEL,
                "input", List.of(
                        Map.of("role","system","content", guardrails),
                        Map.of("role","user","content", "Brief nga admini:\n" + req.brief())
                ),
                "text", Map.of(
                        "format", Map.of(
                                "type", "json_schema",
                                "name", "SurveyDraft",
                                "strict", true,
                                "schema", schemaMap
                        )
                ),
                "temperature", 0.35
        );

        // 4) Thirrja te OpenAI me logim gabimesh (nëse ka)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> rb;
        try {
            ResponseEntity<Map> resp = rest.exchange(
                    OPENAI_URL, HttpMethod.POST, new HttpEntity<>(body, headers), Map.class);
            rb = resp.getBody();
        } catch (RestClientResponseException ex) {
            log.error("OpenAI error: status={} body={}", ex.getRawStatusCode(), ex.getResponseBodyAsString());
            throw ex;
        }

        if (rb == null) {
            log.error("Përgjigje bosh nga modeli.");
            throw new RuntimeException("Përgjigje bosh nga modeli.");
        }

        // (opsionale) në Responses API mund të ketë fushë "refusal"
        if (rb.containsKey("refusal") && rb.get("refusal") != null) {
            log.warn("Model refusal: {}", rb.get("refusal"));
            throw new IllegalArgumentException("Model refused the request (safety). Riformulo brief-in.");
        }

        // 5) Merr JSON-in e strukturuar
        String json = rb.get("output_text") instanceof String s && !s.isBlank()
                ? s
                : extractFromOutput(rb); // fallback

        if (log.isDebugEnabled()) log.debug("AI JSON: {}", json);

        // 6) Mapim në DTO-t e tua
        var node = om.readTree(json);

        String title = node.path("title").asText("");
        String description = node.path("description").asText("");

        List<QuestionDto> questions = new ArrayList<>();
        var qArr = node.path("questions");
        if (!qArr.isArray()) {
            log.error("questions nuk është array në output.");
            throw new RuntimeException("Output-i i modelit është i pavlefshëm (questions).");
        }

        qArr.forEach(qNode -> {
            String qText = qNode.path("text").asText("");
            String qTypeStr = qNode.path("type").asText("").toUpperCase();

            // Mapping i pritur: SINGLE_CHOICE, MULTIPLE_CHOICE, OPEN_TEXT
            QuestionType qType = switch (qTypeStr) {
                case "SINGLE_CHOICE"   -> QuestionType.SINGLE_CHOICE;
                case "MULTIPLE_CHOICE" -> QuestionType.MULTIPLE_CHOICE;
                case "OPEN_TEXT"       -> QuestionType.OPEN_TEXT;
                default -> {
                    log.warn("Lloj i panjohur pyetjeje: {}. Do përdorim OPEN_TEXT si fallback.", qTypeStr);
                    yield QuestionType.OPEN_TEXT;
                }
            };

            List<OptionDto> opts = new ArrayList<>();
            if (qType != QuestionType.OPEN_TEXT) {
                var oArr = qNode.path("options");
                if (oArr.isArray()) {
                    oArr.forEach(oNode -> {
                        String t = oNode.path("text").asText("");
                        if (!t.isBlank()) opts.add(new OptionDto(null, t.trim()));
                    });
                }
                // Siguri minimale: ≥2 opsione për choice
                if (opts.size() < 2) {
                    opts.clear();
                    opts.add(new OptionDto(null, "Po"));
                    opts.add(new OptionDto(null, "Jo"));
                }
            } // OPEN_TEXT -> options bosh

            questions.add(new QuestionDto(null, qText.trim(), qType, qType == QuestionType.OPEN_TEXT ? List.of() : opts));
        });

        // 7) Kthe SurveyDto – fushat e tjera i plotëson admini
        return new SurveyDto(
                null,                 // id
                title.trim(),
                description.trim(),
                null,                 // imageUrl – admini e zgjedh
                null,                 // endDate – admini e vendos
                SurveyStatus.DRAFT,   // default
                questions
        );
    }

    @SuppressWarnings("unchecked")
    private String extractFromOutput(Map<String, Object> rb) {
        var output = (List<Map<String,Object>>) rb.get("output");
        if (output == null || output.isEmpty()) throw new RuntimeException("output mungon.");
        var content = (List<Map<String,Object>>) output.get(0).get("content");
        if (content == null || content.isEmpty()) throw new RuntimeException("content mungon.");
        Object text = content.get(0).get("text");
        if (!(text instanceof String s) || s.isBlank()) throw new RuntimeException("output_text mungon.");
        return s;
    }
}
