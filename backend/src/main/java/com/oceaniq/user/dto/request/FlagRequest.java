package com.oceaniq.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;

/**
 * Request DTO for flagging a user for moderation (used by admins)
 * 
 * Contains:
 * - reason: required field for why user is being flagged (message is returned if reason is missing / blank in request)
 * - additionalNotes: optional field for any extra context about the flag
*/
@Getter
@Setter
public class FlagRequest {
    
    @NotBlank(message = "Reason is required")
    private String reason;
    private String additionalNotes;
}