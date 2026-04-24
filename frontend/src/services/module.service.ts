/**
 * Learning Modules API Service
 * Handles module retrieval, enrollment, and progress tracking
 */

import { apiClient, buildQueryString } from './api.config';
import type {
  ApiResponse,
  LearningModuleDetail,
  ModulesResponse,
  ModuleQueryParams,
  UpdateProgressRequest,
} from '../types/api';

export const moduleService = {
  /**
   * Get list of all learning modules
   */
  getModules: async (params: ModuleQueryParams = {}): Promise<ApiResponse<ModulesResponse>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<ModulesResponse>>(`/modules${queryString}`);
    return response.data;
  },

  /**
   * Get detailed information about a specific module
   */
  getModuleById: async (moduleId: number): Promise<ApiResponse<LearningModuleDetail>> => {
    const response = await apiClient.get<ApiResponse<LearningModuleDetail>>(`/modules/${moduleId}`);
    return response.data;
  },

  /**
   * Update progress for a module
   */
  updateProgress: async (data: UpdateProgressRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>('/modules/progress', data);
    return response.data;
  },
};
