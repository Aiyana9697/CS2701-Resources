package com.oceaniq.module.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.oceaniq.module.enums.LessonType;

@Entity
@Table(name = "lessons")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private LearningModule module;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(nullable = false)
    private Integer orderIndex;
    
    @Column(length = 50)
    private String duration;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LessonType type = LessonType.READING;
    
    private String resourceUrl;

}
