package com.oceaniq.module.repository;

import com.oceaniq.module.entity.UserModuleProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserModuleProgressRepository extends JpaRepository<UserModuleProgress, Long> {
    
    Optional<UserModuleProgress> findByUserIdAndModuleId(Long userId, Long moduleId);
    
    List<UserModuleProgress> findByUserId(Long userId);
    
    @Query("SELECT COUNT(p) FROM UserModuleProgress p WHERE p.user.id = :userId AND p.status = 'COMPLETED'")
    Integer countCompletedModulesByUser(@Param("userId") Long userId);
    
    @Query("SELECT p FROM UserModuleProgress p WHERE p.user.id = :userId ORDER BY p.lastAccessedAt DESC")
    List<UserModuleProgress> findRecentProgressByUser(@Param("userId") Long userId);
}

