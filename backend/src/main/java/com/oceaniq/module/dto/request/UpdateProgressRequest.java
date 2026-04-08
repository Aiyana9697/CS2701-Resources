package com.oceaniq.module.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
public class UpdateProgressRequest {
    
    @NotNull(message = "Module ID is required")
    private Long moduleId;
    
    @NotNull(message = "Progress is required")
    @Min(value = 0, message = "Progress must be at least 0")
    @Max(value = 100, message = "Progress must not exceed 100")
    private Integer progress;
    private Integer currentLesson;
}  

