package com.oceaniq.auth.controller;

import com.oceaniq.auth.dto.request.*;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.auth.dto.response.AuthResponse;
import com.oceaniq.auth.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    /**
     * Controller for handling authentication-related endpoints
     * Exposes endpoints for:
     * - User registration (/register)
     * - User login (/login)
     * Each endpoint accepts a request body with the necessary information, calls the AuthService to perform the action, and returns an ApiResponse with the result
     * The AuthService is responsible for the business logic of registering and authenticating users, including validating input, checking credentials, and generating JWT tokens
     * The controller uses @RestController to indicate it's a RESTful controller, @RequestMapping to set the base path for all endpoints, and @CrossOrigin to allow requests from the frontend development server
     * The endpoints return ResponseEntity objects with appropriate HTTP status codes (201 Created for registration, 200 OK for login) and the response body wrapped in an ApiResponse object for consistent API responses
    */
    private final AuthService authService;
    
    /**
     * Endpoint to register a new user
     * @param request the registration request containing username, email and password
     * @return ApiResponse containing the AuthResponse (including JWT token) if registration is successful (or error message if registration fails)
     * calls authService.register() to handle the registration logic (includes validating request, creating a new user and generating a JWT token for the new user)
     * if update is successful, returns a ResponseEntity with HTTP status 201 Created and the AuthResponse wrapped in an ApiResponse object
     * if update fails (e.g. due to invalid status), throws an exception which results in an error response being returned to the client
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        
        AuthResponse response = authService.register(request);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        
        AuthResponse response = authService.login(request);
        
        return ResponseEntity.ok(
                ApiResponse.success("Login successful", response));
    }
}