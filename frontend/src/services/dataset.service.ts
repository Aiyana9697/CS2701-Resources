/**
 * Dataset Management API Service
 * Handles dataset upload, retrieval, and management
 */

import { apiClient, buildQueryString } from './api.config';
import type {
  ApiResponse,
  Dataset,
  DatasetsResponse,
  DatasetQueryParams,
  FlagDatasetRequest,
} from '../types/api';

export const datasetService = {
  /**
   * Get list of datasets
   * Admin sees all, users see only verified
   */
  getDatasets: async (params: DatasetQueryParams = {}): Promise<ApiResponse<DatasetsResponse>> => {
    // buildQueryString turns an object like { search: 'reef' } into '?search=reef'
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<DatasetsResponse>>(`/datasets${queryString}`);
    return response.data;
  },

  /**
   * Upload a new dataset
   */
  uploadDataset: async (data: Record<string, unknown>): Promise<ApiResponse<Dataset>> => {
    const response = await apiClient.post<ApiResponse<Dataset>>('/datasets', data);
    return response.data;
  },

  /**
   * Flag a dataset (admin only)
   */
  flagDataset: async (datasetId: number, data: FlagDatasetRequest): Promise<ApiResponse<void>> => {
    const response = await apiClient.put<ApiResponse<void>>(`/datasets/${datasetId}/flag`, data);
    return response.data;
  },

  /**
   * Delete a dataset (admin only)
   */
  deleteDataset: async (datasetId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/datasets/${datasetId}`);
    return response.data;
  },

  /**
   * Verify a dataset (admin only)
   */
  verifyDataset: async (datasetId: number): Promise<ApiResponse<Dataset>> => {
    // the backend endpoint expects the new status in the request body
    const response = await apiClient.put<ApiResponse<Dataset>>(`/datasets/${datasetId}/status`, {
      status: 'VERIFIED',
    });
    return response.data;
  },
};
