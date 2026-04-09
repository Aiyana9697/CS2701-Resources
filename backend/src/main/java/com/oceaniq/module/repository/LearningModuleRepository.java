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

@Repository
public interface LearningModuleRepository extends JpaRepository<LearningModule, Long> {
    
    Page<LearningModule> findByCategory(String category, Pageable pageable);
    
    Page<LearningModule> findByDifficultyLevel(
        DifficultyLevel level, Pageable pageable);
    
    @Query("SELECT m FROM LearningModule m WHERE " +
           "LOWER(m.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(m.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<LearningModule> searchModules(@Param("search") String search, Pageable pageable);
    
    List<LearningModule> findAllByOrderByCreatedAtDesc();
}