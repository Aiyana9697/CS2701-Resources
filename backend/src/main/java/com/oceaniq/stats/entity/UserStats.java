package com.oceaniq.stats.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import org.hibernate.annotations.UpdateTimestamp;
import com.oceaniq.user.entity.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_stats")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserStats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(nullable = false)
    private Integer modulesCompleted = 0;
    
    @Column(nullable = false)
    private Integer datasetsUploaded = 0;
    
    @Column(nullable = false)
    private Integer discussionsStarted = 0;
    
    @Column(nullable = false)
    private Integer incidentsReported = 0;
    
    @Column(nullable = false)
    private Integer totalPoints = 0;
    
    @Column(nullable = false)
    private Integer currentStreak = 0;
    
    @Column(nullable = false)
    private Integer longestStreak = 0;
    
    private LocalDateTime lastActivityDate;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}