export interface Recommendation {
    title: string;
    difficulty: string;
    leetcodeUrl: string;
    reason: string;
}

export interface RoadmapWeek {
    weekNumber: number;
    focusArea: string;
    description: string;
}

export interface TopicSkill {
    topic: string;
    proficiencyLevel: number;
}

export interface LeetCodeStats {
    username: string;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
}

export interface AnalysisResponse {
    readinessScore: number;
    topicSkills: TopicSkill[];
    weakAreas: string[];
    roadmap: RoadmapWeek[];
    recommendations: Recommendation[];
    summary: string;
    userStats: LeetCodeStats;
}
