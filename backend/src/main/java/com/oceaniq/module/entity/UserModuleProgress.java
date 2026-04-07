package com.oceaniq.module.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import com.oceaniq.user.entity.User;
import com.oceaniq.module.enums.ModuleStatus;

/**
 * Entity representing users progress for each learning module 
 * maps to 'user_module_progress' table in database 
 * 
*/
@Entity
@Table(name = "user_module_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "module_id"})
})
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserModuleProgress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private LearningModule module;
    
    @Column(nullable = false)
    private Integer progress = 0; // 0-100
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ModuleStatus status = ModuleStatus.NOT_STARTED;
    
    private LocalDateTime startedAt;
    
    private LocalDateTime completedAt;
    
    private Integer currentLesson;
    
    private LocalDateTime lastAccessedAt;

}