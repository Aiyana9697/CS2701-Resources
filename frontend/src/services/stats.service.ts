/**
 * User Stats API Service
 * Handles admin user statistics endpoints exposed by the backend
 */

import { apiClient, buildQueryString } from './api.config';
import type {
  ApiResponse,
  UserStats,
  PaginationParams,
} from '../types/api';

export const statsService = {
  /**
   * Get paginated user statistics (admin only)
   */
  getUserStats: async (params: PaginationParams = {}): Promise<ApiResponse<any>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<any>>(`/admin/stats${queryString}`);
    return response.data;
  },

  /**
   * Get a single user's statistics (admin only)
   */
  getUserStatsByUserId: async (userId: number): Promise<ApiResponse<UserStats>> => {
    const response = await apiClient.get<ApiResponse<UserStats>>(`/admin/stats/${userId}`);
    return response.data;
  },

  /**
   * Get leaderboard ordered by total points (admin only)
   */
  getLeaderboard: async (params: PaginationParams = {}): Promise<ApiResponse<any>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<any>>(`/admin/stats/leaderboard${queryString}`);
    return response.data;
  },
};
