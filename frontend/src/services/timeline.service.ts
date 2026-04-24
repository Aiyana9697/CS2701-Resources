import { API_ROOT_URL, apiClient } from './api.config';
import type { ApiResponse, TimelineEvent } from '../types/api';

export const timelineService = {
  getTimelineEvents: async (): Promise<ApiResponse<TimelineEvent[]>> => {
    const response = await apiClient.get<ApiResponse<TimelineEvent[]>>('/api/learn/timeline', {
      baseURL: API_ROOT_URL,
    });
    return response.data;
  },
};
