package com.oceaniq.infrastructure.exception;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse; 

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

/**
 * Responsible for catching application-wide exceptions.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles ResourceNotFoundException thrown when requested resource cant be found in system
     * gets the exception message and logs it as an error 
     * returns a standardized API error response with HTTP 404 status code and the exception message as the error message in the response body
     *
     * @param ex the exception thrown
     * @param request the current web request
     * @return standardized API error response with HTTP 404 status
     */
     @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {

        log.error("Resource not found: {}", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(ex.getMessage()));
    }
}