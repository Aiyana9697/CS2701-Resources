package com.oceaniq.module.dto.response;

import com.oceaniq.module.enums.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Response DTO representing a learning module with its lessons and user's progress info
 * includes: 
 * module metadata (id, title, description, icon, lessons count, duration, category, difficulty level)
 * user's progress (percentage and status) 
 * list of lessons in the module + lesson metadata (id, title, content, order index, duration, type, resource URL)
*/
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
    private Integer progress;
    private String status;
    private List<LessonResponse> lessons;
    
    @Getter
    @Setter
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

