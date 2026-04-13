package com.oceaniq.dataset.dto.response;

import com.oceaniq.dataset.enums.DatasetStatus;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Response DTO for returning dataset information
 * object is sent to the client instead of the dataset entity to control what data is exposed 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DatasetResponse {
    
    private Long id;
    private String name;
    private String description;
    private String uploaderName;
    private Long uploaderId;
    private LocalDate uploadDate;
    private Long fileSize;
    private String fileUrl;
    private DatasetStatus status;
    private String category;
    private String region;
    private Integer downloadCount;
    private LocalDateTime createdAt;
}