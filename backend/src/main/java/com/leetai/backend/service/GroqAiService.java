package com.leetai.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leetai.backend.model.AnalysisResponse;
import com.leetai.backend.model.LeetCodeStats;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroqAiService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;

    public GroqAiService(
            @Value("${groq.api.baseurl}") String baseUrl,
            @Value("${groq.api.key}") String apiKey) {
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
        this.objectMapper = new ObjectMapper();
        this.apiKey = apiKey;
    }

    public Mono<AnalysisResponse> analyzeProfile(LeetCodeStats stats) {
        if ("mock".equals(apiKey)) {
            return Mono.just(getMockResponse(stats));
        }

        String prompt = buildPrompt(stats);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama-3.1-70b-versatile");

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are an expert tech interviewer and coding coach. " +
                "Analyze the provided LeetCode user statistics and generate a personalized interview preparation roadmap. "
                +
                "Respond ONLY with valid JSON matching the exact structure requested, with no markdown code blocks around it.");

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);

        messages.add(systemMessage);
        messages.add(userMessage);
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.7);
        requestBody.put("response_format", Map.of("type", "json_object"));

        return webClient.post()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> parseResponse(response));
    }

    private String buildPrompt(LeetCodeStats stats) {
        return String.format(
                "Analyze these LeetCode stats and generate an interview readiness report in JSON.\\n" +
                        "Stats: User %s has solved %d total problems (%d easy, %d medium, %d hard) out of %d. " +
                        "Acceptance rate is %.2f%%. Ranking is %d.\\n" +
                        "Provide exactly this JSON structure:\\n" +
                        "{\\\"readinessScore\\\": (0-100), \\\"topicSkills\\\": [{\\\"topic\\\": \\\"Arrays\\\", \\\"proficiencyLevel\\\": 0-100}], "
                        +
                        "\\\"weakAreas\\\": [\\\"Strings\\\"], \\\"roadmap\\\": [{\\\"weekNumber\\\": 1, \\\"focusArea\\\": \\\"...\\\", \\\"description\\\": \\\"...\\\"}], "
                        +
                        "\\\"recommendations\\\": [{\\\"title\\\": \\\"Two Sum\\\", \\\"leetcodeUrl\\\": \\\"https://leetcode.com/problems/two-sum/\\\", \\\"difficulty\\\": \\\"Easy\\\", \\\"reason\\\": \\\"...\\\"}], "
                        +
                        "\\\"summary\\\": \\\"...\\\"}",
                stats.getUsername(), stats.getTotalSolved(), stats.getEasySolved(), stats.getMediumSolved(),
                stats.getHardSolved(),
                stats.getTotalQuestions(), stats.getAcceptanceRate(), stats.getRanking());
    }

    private AnalysisResponse parseResponse(Map<?, ?> apiResponse) {
        try {
            List<?> choices = (List<?>) apiResponse.get("choices");
            Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");
            String content = (String) message.get("content");
            return objectMapper.readValue(content, AnalysisResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }

    private AnalysisResponse getMockResponse(LeetCodeStats stats) {
        AnalysisResponse response = new AnalysisResponse();

        // Dynamic mock logic based on stats
        int score = (int) Math.min(100,
                (stats.getMediumSolved() * 0.5 + stats.getHardSolved() * 1.5 + stats.getEasySolved() * 0.1));
        if (score == 0)
            score = 42; // Fallback

        response.setReadinessScore(score);
        response.setSummary("Based on your " + stats.getTotalSolved()
                + " solved problems, you have a solid foundation but need more medium/hard practice.");

        List<AnalysisResponse.TopicSkill> skills = new ArrayList<>();
        AnalysisResponse.TopicSkill arrays = new AnalysisResponse.TopicSkill();
        arrays.setTopic("Arrays & Hashing");
        arrays.setProficiencyLevel(85);
        skills.add(arrays);
        response.setTopicSkills(skills);

        response.setWeakAreas(List.of("Dynamic Programming", "Graphs", "Advanced Trees"));

        List<AnalysisResponse.RoadmapWeek> roadmap = new ArrayList<>();
        AnalysisResponse.RoadmapWeek week1 = new AnalysisResponse.RoadmapWeek();
        week1.setWeekNumber(1);
        week1.setFocusArea("Graph Fundamentals");
        week1.setFocusArea("Master BFS and DFS traversals on matrices and adjacency lists.");
        roadmap.add(week1);
        response.setRoadmap(roadmap);

        List<AnalysisResponse.RecommendedProblem> recs = new ArrayList<>();
        AnalysisResponse.RecommendedProblem rec1 = new AnalysisResponse.RecommendedProblem();
        rec1.setTitle("Number of Islands");
        rec1.setLeetcodeUrl("https://leetcode.com/problems/number-of-islands/");
        rec1.setDifficulty("Medium");
        rec1.setReason("Fundamental BFS/DFS problem.");
        recs.add(rec1);
        response.setRecommendations(recs);

        return response;
    }
}
