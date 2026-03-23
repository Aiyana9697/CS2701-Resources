package com.oceaniq.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class FlagRequest {
    
    @NotBlank(message = "Reason is required")
    private String reason;
    
    private String additionalNotes;
}