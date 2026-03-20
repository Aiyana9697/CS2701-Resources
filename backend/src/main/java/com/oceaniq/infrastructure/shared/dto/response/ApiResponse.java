package com.oceaniq.infrastructure.shared.dto.response;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 *
 * Generic response wrapper used to standardize API response across the entire application.
 *
 * The generic type parameter <T> allows  class to wrap any type of data
 * returned by the API (UserResponse, DatasetResponse, lists)
 *
 * ensures all endpoints return responses in a consistent format.
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    
    private boolean success; // indicates if request was successful
    private String message; // provides human-readable message about request's result
    private T data; // actual response data returned by the API (can be any type)
    private LocalDateTime timestamp; // timestamp of when response was generated
    
    // creates successful API response with default message "Success" and provided data
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Success", data, LocalDateTime.now());
    }
    
    // creates successful API response with custom message and data
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, LocalDateTime.now());
    }
}