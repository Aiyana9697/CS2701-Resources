package com.oceaniq.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;

/**
 * DTO for handling forgot password requests
 * contains the user's email address
*/
@Setter
@Getter
public class ForgotPasswordRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
}
