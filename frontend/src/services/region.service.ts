/**
 * Regions & Species API Service
 * Handles ocean regions and marine species data
 */

import { apiClient, buildQueryString } from './api.config';
import type {
  ApiResponse,
  Region,
  SpeciesResponse,
  SpeciesQueryParams,
} from '../types/api';

export const regionService = {
  /**
   * Get list of ocean regions
   */
  getRegions: async (): Promise<ApiResponse<Region[]>> => {
    const response = await apiClient.get<ApiResponse<Region[]>>('/regions');
    return response.data;
  },

  /**
   * Get detailed information about a region
   */
  getRegionById: async (regionId: number): Promise<ApiResponse<Region>> => {
    const response = await apiClient.get<ApiResponse<Region>>(`/regions/${regionId}`);
    return response.data;
  },

  /**
   * Get regions by type
   */
  getRegionsByType: async (type: string): Promise<ApiResponse<Region[]>> => {
    const response = await apiClient.get<ApiResponse<Region[]>>(`/regions/type/${encodeURIComponent(type)}`);
    return response.data;
  },

  /**
   * Get regions by ocean name
   */
  getRegionsByOcean: async (oceanName: string): Promise<ApiResponse<Region[]>> => {
    const response = await apiClient.get<ApiResponse<Region[]>>(`/regions/ocean/${encodeURIComponent(oceanName)}`);
    return response.data;
  },

  /**
   * Get list of marine species
   */
  getSpecies: async (params: SpeciesQueryParams = {}): Promise<ApiResponse<SpeciesResponse>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<SpeciesResponse>>(`/species${queryString}`);
    return response.data;
  },
};
