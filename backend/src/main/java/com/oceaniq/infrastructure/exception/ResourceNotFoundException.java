package com.oceaniq.infrastructure.exception;

/*
 * Custom exception used when a requested resource cannot be found in system 
 * corresponds to HTTP status code 404.
 * exception is handled globally by GlobalExceptionHandler
 * to return a structured JSON error response 
 */
public class ResourceNotFoundException extends RuntimeException {
    
    // Constructor to create a ResourceNotFoundException with a message and an optional cause 
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    // constructor used when wrapping another exception (e.g. database error) as a ResourceNotFoundException
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}