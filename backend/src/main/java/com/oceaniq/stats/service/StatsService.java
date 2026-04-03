package com.oceaniq.stats.service;

import com.oceaniq.stats.dto.response.StatsResponse;
import com.oceaniq.stats.entity.UserStats;
import com.oceaniq.stats.repository.UserStatsRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final UserStatsRepository userStatsRepository;

    /**
     * Get paginated user statistics.
     */
    public Page<StatsResponse> getUserStats(Pageable pageable) {

        Page<UserStats> stats = userStatsRepository.findAll(pageable);

        return stats.map(this::convertToResponse);
    }

    /**
     * Get statistics for a specific user.
     */
    public StatsResponse getStatsByUserId(Long userId) {

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User stats not found"));

        return convertToResponse(stats);
    }

    /**
     * Get leaderboard sorted by total points.
     */
    public Page<StatsResponse> getLeaderboard(Pageable pageable) {

        Page<UserStats> leaderboard =
                userStatsRepository.findAllByOrderByTotalPointsDesc(pageable);

        return leaderboard.map(this::convertToResponse);
    }

    /**
     * Update a user's stats (example for incrementing modules completed).
     */
    @Transactional
    public StatsResponse incrementModulesCompleted(Long userId) {

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User stats not found"));

        stats.setModulesCompleted(stats.getModulesCompleted() + 1);

        return convertToResponse(userStatsRepository.save(stats));
    }

    /**
     * Convert entity -> response DTO.
     */
    private StatsResponse convertToResponse(UserStats stats) {

        StatsResponse response = new StatsResponse();

        response.setUserId(stats.getUser().getId());
        response.setModulesCompleted(stats.getModulesCompleted());
        response.setDatasetsUploaded(stats.getDatasetsUploaded());
        response.setDiscussionsStarted(stats.getDiscussionsStarted());
        response.setIncidentsReported(stats.getIncidentsReported());
        response.setTotalPoints(stats.getTotalPoints());
        response.setCurrentStreak(stats.getCurrentStreak());
        response.setLongestStreak(stats.getLongestStreak());
        response.setLastActivityDate(stats.getLastActivityDate());
        response.setUpdatedAt(stats.getUpdatedAt());

        return response;
    }
}