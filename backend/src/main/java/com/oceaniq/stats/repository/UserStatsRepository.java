package com.oceaniq.stats.repository;

import com.oceaniq.stats.entity.UserStats;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserStatsRepository extends JpaRepository<UserStats, Long> {
    
    Optional<UserStats> findByUserId(Long userId);
    Page<UserStats> findAllByOrderByTotalPointsDesc(Pageable pageable);
}