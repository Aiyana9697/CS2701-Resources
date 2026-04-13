package com.oceaniq.module.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;
import lombok.Getter;

/**
 * Request DTO for updating user's progress in a learning module 
 * contains moduleId, progress percentage and current lesson ID (optional)
*/
@Setter
@Getter
public class UpdateProgressRequest {
    
    // ID of module for which progress is being updated (required)
    @NotNull(message = "Module ID is required")
    private Long moduleId;


    // Progress percentage indicating how much of the module user has completed (required)
    // @Min and @Max annotations used to ensure progress value is between 0 - 100
    @NotNull(message = "Progress is required")
    @Min(value = 0, message = "Progress must be at least 0")
    @Max(value = 100, message = "Progress must not exceed 100")
    private Integer progress;

    // ID of current lesson user is on within module (optional, can be null if user hasn't started a lesson)
    private Integer currentLesson;
}  

