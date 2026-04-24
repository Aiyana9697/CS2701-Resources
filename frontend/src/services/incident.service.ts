/**
 * Incident Reporting API Service
 * Handles incident reports and statistics
 */

import { apiClient, API_ROOT_URL } from './api.config';
import type {
  ApiResponse,
  IncidentReport,
  UpdateIncidentStatusRequest,
} from '../types/api';

export const incidentService = {
  /**
   * Get all incident reports
   */
  getIncidents: async (): Promise<ApiResponse<IncidentReport[]>> => {
    const response = await apiClient.get<ApiResponse<IncidentReport[]>>('/report', {
      baseURL: API_ROOT_URL,
    });
    return response.data;
  },

  /**
   * Submit a new incident report
   */
  submitIncident: async (data: Record<string, unknown>): Promise<ApiResponse<IncidentReport>> => {
    const response = await apiClient.post<ApiResponse<IncidentReport>>('/report', data, {
      baseURL: API_ROOT_URL,
    });
    return response.data;
  },

  /**
   * Get a single incident report by id
   */
  getIncidentById: async (incidentId: number): Promise<ApiResponse<IncidentReport>> => {
    const response = await apiClient.get<ApiResponse<IncidentReport>>(`/report/${incidentId}`, {
      baseURL: API_ROOT_URL,
    });
    return response.data;
  },

  /**
   * Update incident status (admin only)
   */
  updateIncidentStatus: async (incidentId: number, data: UpdateIncidentStatusRequest): Promise<ApiResponse<IncidentReport>> => {
    const response = await apiClient.patch<ApiResponse<IncidentReport>>(`/report/${incidentId}/status`, data, {
      baseURL: API_ROOT_URL,
    });
    return response.data;
  },
};
