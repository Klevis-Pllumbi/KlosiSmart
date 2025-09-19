package com.klevispllumbi.klosismart.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OpenAiService {

    private final String apiKey = System.getenv("OPENAI_API_KEY");
    private final String url = "https://api.openai.com/v1/chat/completions";

    private final Map<String, List<Map<String, String>>> sessionHistory = new ConcurrentHashMap<>();

    private final int MAX_HISTORY = 5; // limit mesazhesh për kontekst

    public String askQuestion(String sessionId, String userQuestion) {
        RestTemplate restTemplate = new RestTemplate();

        // 🔹 Prompt i fuqishëm për të kufizuar fushën e chatbot-it
        String systemPrompt = """
    Ti je një asistent virtual i specializuar për qytetarët shqiptarë.
    Qëllimi yt është t'u japësh udhëzime praktike, të sakta dhe të përditësuara
    mbi administratën publike, shërbimet shtetërore, qeverisjen vendore,
    si dhe çështje që lidhen me politikat publike dhe përdorimin e fondeve shtetërore në Shqipëri.

    Udhëzimet:
    - Jep gjithmonë hapa praktikë (step by step).
    - Nëse ekziston një shërbim online (p.sh. e-Albania), jep linkun përkatës.
    - Nëse pyetja kërkon informacion të përditësuar (p.sh. oraret e shërbimeve, ligje të reja, buxhetet vjetore),
      përdor aftësinë për të kërkuar në web.
    - Mund të shpjegosh edhe të dhëna mbi financat publike, fondet shtetërore,
      ose sektorë specifikë të mbështetur nga qeveria (p.sh. shëndetësia, arsimi).
    - Mos u përgjigj për tema krejtësisht jashtë administratës publike dhe qeverisjes
      (p.sh. këshilla personale, teknologji të pa lidhura, receta gatimi).
      Nëse pyetja është jashtë fushës, përgjigju me:
      "Më vjen keq, unë ofroj vetëm informacion mbi administratën, shërbimet publike dhe politikat shtetërore."
    - Përgjigju gjithmonë në gjuhën shqipe.
""";

        // 🔹 Merr historikun ekzistues ose krijo të ri
        List<Map<String, String>> history = sessionHistory.getOrDefault(sessionId, new ArrayList<>());

        // 🔹 Shto pyetjen e re në history
        history.add(Map.of("role", "user", "content", userQuestion));

        // 🔹 Mbaj vetëm 5 mesazhet e fundit
        if (history.size() > MAX_HISTORY) {
            history = history.subList(history.size() - MAX_HISTORY, history.size());
        }

        sessionHistory.put(sessionId, history);

        // 🔹 Ndërto listën e mesazheve për OpenAI
        List<Map<String, String>> messagesForApi = new ArrayList<>();
        messagesForApi.add(Map.of("role", "system", "content", systemPrompt));
        messagesForApi.addAll(history);

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4.1",
                "messages", messagesForApi,
                "temperature", 0.4
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        try {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                String botAnswer = (String) message.get("content");

                // 🔹 Shto përgjigjen e bot-it në historik
                history.add(Map.of("role", "assistant", "content", botAnswer));
                if (history.size() > MAX_HISTORY) {
                    history = history.subList(history.size() - MAX_HISTORY, history.size());
                }
                sessionHistory.put(sessionId, history);

                return botAnswer;
            } else {
                return "Nuk mora dot përgjigje nga modeli.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Gabim gjatë marrjes së përgjigjes.";
        }
    }
}
