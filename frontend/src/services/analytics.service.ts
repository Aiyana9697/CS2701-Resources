/**
 * Analytics API Service
 * Handles platform analytics and statistics (admin only)
 */

import { apiClient, buildQueryString } from './api.config';
import type {
  ApiResponse,
  RegionAnalyticsResponse,
  ContributorAnalyticsResponse,
  ContributorAnalyticsParams,
  PlatformStats,
} from '../types/api';

export const analyticsService = {
  /**
   * Get most viewed regions analytics (admin only)
   */
  getMostViewedRegions: async (): Promise<ApiResponse<RegionAnalyticsResponse>> => {
    const response = await apiClient.get<ApiResponse<RegionAnalyticsResponse>>('/admin/analytics/regions');
    return response.data;
  },

  /**
   * Get most active contributors analytics (admin only)
   */
  getMostActiveContributors: async (params: ContributorAnalyticsParams = {}): Promise<ApiResponse<ContributorAnalyticsResponse>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<ContributorAnalyticsResponse>>(`/admin/analytics/contributors${queryString}`);
    return response.data;
  },

  /**
   * Get overall platform statistics (admin only)
   */
  getPlatformStats: async (): Promise<ApiResponse<PlatformStats>> => {
    const response = await apiClient.get<ApiResponse<PlatformStats>>('/admin/analytics/platform-stats');
    return response.data;
  },
};
