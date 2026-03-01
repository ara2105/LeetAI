import axios from 'axios';
import type { AnalysisResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const LeetAiService = {
    analyzeUser: async (username: string): Promise<AnalysisResponse> => {
        try {
            const response = await apiClient.get<AnalysisResponse>('/analyze', {
                params: { username }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data || 'Failed to analyze user. Please check the username or try again later.');
            }
            throw error;
        }
    }
};
