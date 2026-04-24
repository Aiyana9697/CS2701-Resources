/**
 * User Management API Service
 * Handles user CRUD operations (admin only)
 */

import { apiClient, buildQueryString } from './api.config';
import type {
  ApiResponse,
  User,
  UsersResponse,
  UserQueryParams,
  FlagUserRequest,
  UpdateUserRoleRequest,
} from '../types/api';

export const userService = {
  /**
   * Get list of all users (admin only)
   */
  getUsers: async (params: UserQueryParams = {}): Promise<ApiResponse<UsersResponse>> => {
    const queryString = buildQueryString(params);
    const response = await apiClient.get<ApiResponse<UsersResponse>>(`/admin/users${queryString}`);
    return response.data;
  },

  /**
   * Get a single user by id (admin only)
   */
  getUserById: async (userId: number): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(`/admin/users/${userId}`);
    return response.data;
  },

  /**
   * Flag a user account (admin only)
   */
  flagUser: async (userId: number, data: FlagUserRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(`/admin/users/${userId}/flag`, data);
    return response.data;
  },

  /**
   * Delete a user account (admin only)
   */
  deleteUser: async (userId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/admin/users/${userId}`);
    return response.data;
  },

  /**
   * Update user role (admin only)
   */
  updateUserRole: async (userId: number, data: UpdateUserRoleRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(`/admin/users/${userId}/role`, data);
    return response.data;
  },
};
