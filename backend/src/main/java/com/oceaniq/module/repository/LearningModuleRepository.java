package com.oceaniq.module.repository;

import com.oceaniq.module.entity.LearningModule;
import com.oceaniq.module.enums.DifficultyLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing LearningModule entities
 * extends JpaRepository to provide basic CRUD operations and pagination support
 * provides methods for filtering, searching, retrieving modules by category, difficulty, keyword search in title/description
 * 
 * Inspiration and reference were taken from:
 * https://stackoverflow.com/questions/13019086/how-to-search-several-columns-in-a-sql-query-using-concat-and-upper
 */
@Repository
public interface LearningModuleRepository extends JpaRepository<LearningModule, Long> {
    
    // retieves modules filtered by category with pqgination
    Page<LearningModule> findByCategory(String category, Pageable pageable);
    
    // retrieves modules filtered by difficulty level with pagination
    Page<LearningModule> findByDifficultyLevel(DifficultyLevel level, Pageable pageable);
    
    // retrieves modules where title or description contains search keyword (case-insensitive) with pagination
    @Query("SELECT m FROM LearningModule m WHERE " +
           "LOWER(m.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(m.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<LearningModule> searchModules(@Param("search") String search, Pageable pageable);
    
    // retrieves all modules ordered by creation date in descending order (newest first)
    List<LearningModule> findAllByOrderByCreatedAtDesc();
}