package com.oceaniq.stats.dto.response;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatsResponse {
    
    private Long userId;
    private Integer modulesCompleted;
    private Integer datasetsUploaded;
    private Integer discussionsStarted;
    private Integer incidentsReported;
    private Integer totalPoints;
    private Integer currentStreak;
    private Integer longestStreak;
    private LocalDateTime lastActivityDate;
}
