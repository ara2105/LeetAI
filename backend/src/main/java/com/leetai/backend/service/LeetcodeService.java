package com.leetai.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.leetai.backend.model.LeetCodeStats;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import com.leetai.backend.model.LeetCodeStats;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class LeetcodeService {

    private final WebClient webClient;

    public LeetcodeService(@Value("${leetcode.api.baseurl}") String leetcodeApiBaseUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(leetcodeApiBaseUrl)
                .build();
    }

    public Mono<LeetCodeStats> fetchUserStats(String username) {
        Mono<java.util.Map> profileMono = this.webClient.get()
                .uri("/{username}", username)
                .retrieve()
                .bodyToMono(java.util.Map.class);

        Mono<java.util.Map> solvedMono = this.webClient.get()
                .uri("/{username}/solved", username)
                .retrieve()
                .bodyToMono(java.util.Map.class);

        return Mono.zip(profileMono, solvedMono).map(tuple -> {
            java.util.Map profile = tuple.getT1();
            java.util.Map solved = tuple.getT2();

            LeetCodeStats stats = new LeetCodeStats();
            stats.setUsername(username);

            try {
                if (profile.containsKey("ranking") && profile.get("ranking") != null)
                    stats.setRanking(Integer.parseInt(profile.get("ranking").toString()));
                if (profile.containsKey("reputation") && profile.get("reputation") != null)
                    stats.setReputation(Integer.parseInt(profile.get("reputation").toString()));

                if (solved.containsKey("solvedProblem") && solved.get("solvedProblem") != null)
                    stats.setTotalSolved(Integer.parseInt(solved.get("solvedProblem").toString()));
                if (solved.containsKey("easySolved") && solved.get("easySolved") != null)
                    stats.setEasySolved(Integer.parseInt(solved.get("easySolved").toString()));
                if (solved.containsKey("mediumSolved") && solved.get("mediumSolved") != null)
                    stats.setMediumSolved(Integer.parseInt(solved.get("mediumSolved").toString()));
                if (solved.containsKey("hardSolved") && solved.get("hardSolved") != null)
                    stats.setHardSolved(Integer.parseInt(solved.get("hardSolved").toString()));
            } catch (Exception ignored) {
            }

            stats.setTotalQuestions(3300); // Approximate
            stats.setAcceptanceRate(50.0); // Approximate fallback

            return stats;
        }).onErrorMap(e -> new RuntimeException("Failed to fetch LeetCode stats for user: " + username, e));
    }
}
