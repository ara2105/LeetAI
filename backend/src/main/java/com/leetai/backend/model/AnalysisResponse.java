package com.leetai.backend.model;

import lombok.Data;
import java.util.List;

@Data
public class AnalysisResponse {
    private int readinessScore;
    private List<TopicSkill> topicSkills;
    private List<String> weakAreas;
    private List<RoadmapWeek> roadmap;
    private List<RecommendedProblem> recommendations;
    private String summary;
    private LeetCodeStats userStats;

    @Data
    public static class TopicSkill {
        private String topic;
        private int proficiencyLevel; // 0-100
    }

    @Data
    public static class RoadmapWeek {
        private int weekNumber;
        private String focusArea;
        private String description;
    }

    @Data
    public static class RecommendedProblem {
        private String title;
        private String leetcodeUrl;
        private String difficulty;
        private String reason;
    }
}
