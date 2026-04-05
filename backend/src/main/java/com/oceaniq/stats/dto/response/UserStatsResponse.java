package com.oceaniq.stats.dto.response;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


/**
 * Response DTO representing user statistics info returned by API
 * object is sent to client instead of stats entity to control what data is exposed 
*/
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserStatsResponse {
    
    private Long userId;
    private Integer modulesCompleted;
    private Integer datasetsUploaded;
    private Integer discussionsStarted;
    private Integer incidentsReported;
    private Integer totalPoints;
    private Integer currentStreak;
    private Integer longestStreak;
    private LocalDateTime lastActivityDate;
    private LocalDateTime updatedAt;
}
