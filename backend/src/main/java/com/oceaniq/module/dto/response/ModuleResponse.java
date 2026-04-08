package com.oceaniq.module.dto.response;

import com.oceaniq.module.enums.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModuleResponse {
    
    private Long id;
    private String title;
    private String description;
    private String icon;
    private Integer lessonsCount;
    private String duration;
    private String category;
    private DifficultyLevel difficultyLevel;
    private List<LessonResponse> lessons;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    

    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LessonResponse {
        
        private Long id;
        private String title;
        private String content;
        private Integer orderIndex;
        private String duration;
        private String type;
        private String resourceUrl;
            
    }
}

