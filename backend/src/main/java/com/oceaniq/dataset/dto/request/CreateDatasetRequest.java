package com.oceaniq.dataset.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;
import lombok.Getter;

/**
 * Request DTO for creating a new dataset
 * contains fields for dataset name, description, category, region, file URL and file size
*/
@Setter
@Getter
public class CreateDatasetRequest {
    
    // Name of the dataset (required, max length 200 characters)
    @NotBlank(message = "Dataset name is required")
    @Size(max = 200, message = "Name must not exceed 200 characters")
    private String name;
    
    // Description of the dataset (optional, max length 5000 characters)
    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;
    
    // Category of the dataset (required, e.g. "Marine Biodiversity", "Ocean Pollution" etc..)
    @NotBlank(message = "Category is required")
    private String category;
    
    // Region (location) associated with the dataset (optional)
    private String region;
    
    // URL or path to the dataset file (required)
    @NotBlank(message = "File URL is required")
    private String fileUrl;
    
    // Size of the dataset file in bytes (required)
    @NotNull(message = "File size is required")
    private Long fileSize;
}