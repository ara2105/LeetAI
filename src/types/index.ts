export interface LeetCodeData {
    username: string;
    totalSolved: number;
    difficulty: {
        easy: number;
        medium: number;
        hard: number;
    };
    topicTags: {
        [tagName: string]: number; // e.g., { "Arrays": 45, "Dynamic Programming": 5 }
    };
}

export interface ProfileAnalysis {
    stats: LeetCodeData;
    performance: {
        pros: string[];
        cons: string[];
    };
    roadmap: {
        focusTopic: string;
        targetQuestions: number;
        reasoning: string;
    }[];
}
