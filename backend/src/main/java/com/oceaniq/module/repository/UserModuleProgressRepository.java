package com.oceaniq.module.repository;

import com.oceaniq.module.entity.UserModuleProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for managing UserModuleProgress entities
 * extends JpaRepository to provide basic CRUD operations
 * provides methods to find progress by user & module, count completed modules and retrieve recent progress entries for a user
*/

@Repository
public interface UserModuleProgressRepository extends JpaRepository<UserModuleProgress, Long> {
    
    // retrieves thr user's progress for a specific module, returns Optional to handle case where theres no progress for module yet
    Optional<UserModuleProgress> findByUserIdAndModuleId(Long userId, Long moduleId);
    
    // Retrieve all module progress records for a specific user
    List<UserModuleProgress> findByUserId(Long userId);
    
    // counts the number of completed modules for a user 
    @Query("SELECT COUNT(p) FROM UserModuleProgress p WHERE p.user.id = :userId AND p.status = 'COMPLETED'")
    Integer countCompletedModulesByUser(@Param("userId") Long userId);
    
    // retrieves recent module progress entries for a user ordered by last accessed date (most recent first)
    @Query("SELECT p FROM UserModuleProgress p WHERE p.user.id = :userId ORDER BY p.lastAccessedAt DESC")
    List<UserModuleProgress> findRecentProgressByUser(@Param("userId") Long userId);
}

