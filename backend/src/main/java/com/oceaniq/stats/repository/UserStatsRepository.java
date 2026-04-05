package com.oceaniq.stats.repository;

import com.oceaniq.stats.entity.UserStats;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository responsible for database operations related to user statistics
 * extends JpaRepository to provide basic CRUD operations and pagination
*/
@Repository
public interface UserStatsRepository extends JpaRepository<UserStats, Long> {
    
    /**
    * Finds user statistics by user ID
    * @param userId the ID of the user
    * @return Optional containing the user statistics if found, otherwise empty
    */
    Optional<UserStats> findByUserId(Long userId);

    /**
     * Retrieves a paginated list of user statistics ordered by total points in descending order
     * used for generating leaderboard of top users based on their total points
     * @param pageable pagination information (page number, page size) for results
     * @return paginated list of user statistics ordered by total points (highest first)
     */
    Page<UserStats> findAllByOrderByTotalPointsDesc(Pageable pageable);
}