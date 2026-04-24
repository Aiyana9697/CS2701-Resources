import { apiClient, buildQueryString } from './api.config';
import type { ApiResponse, ImpactReport } from '../types/api';

interface ImpactQueryParams {
  search?: string;
  impact?: string;
  type?: string;
  page?: number;
  size?: number;
}

export const impactService = {
  getReports: async (params: ImpactQueryParams = {}): Promise<ApiResponse<any>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<any>>(`/impact${queryString}`);
    return response.data;
  },

  createReport: async (data: Record<string, unknown>): Promise<ApiResponse<ImpactReport>> => {
    const response = await apiClient.post<ApiResponse<ImpactReport>>('/impact', data);
    return response.data;
  },
};
