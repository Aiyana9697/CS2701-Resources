package com.oceaniq.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;

/**
 * DTO for handling login requests
 * contains the user's email and password
 * @NotBlank annotations used to ensure email and password fields are not empty
 * @Email annotation used to validate that the email field contains a valid email address format
 */
@Setter
@Getter
public class LoginRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
}