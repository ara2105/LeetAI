package com.leetai.backend.controller;

import com.leetai.backend.model.AnalysisResponse;
import com.leetai.backend.service.GroqAiService;
import com.leetai.backend.service.LeetcodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AnalysisController {

    private final LeetcodeService leetcodeService;
    private final GroqAiService groqAiService;

    @GetMapping("/analyze")
    public Mono<ResponseEntity<Object>> analyzeUser(@RequestParam("username") String username) {
        return leetcodeService.fetchUserStats(username)
                .flatMap(stats -> {
                    if (stats == null || "error".equals(stats.getUsername())) {
                        return Mono.error(new RuntimeException("User not found or API error"));
                    }
                    stats.setUsername(username);
                    return groqAiService.analyzeProfile(stats).map(res -> {
                        res.setUserStats(stats);
                        return res;
                    });
                })
                .map(res -> ResponseEntity.ok((Object) res))
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.just(ResponseEntity.internalServerError().body((Object) e.getMessage()));
                });
    }
}
