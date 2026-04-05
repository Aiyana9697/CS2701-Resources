package com.oceaniq.stats.service;

import com.oceaniq.stats.dto.response.UserStatsResponse;
import com.oceaniq.stats.entity.UserStats;
import com.oceaniq.stats.repository.UserStatsRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**Service layer responsible for buisness logic related to user statistics
 * 
 * Provides methods for:
 * - Retrieving paginated user statistics
 * - Retrieving statistics for a specific user by their ID
 * - Retrieving a leaderboard of users based on their total points
 * - Updating user statistics (example method for incrementing modules completed)
 * 
 * Service methods interact with UserStatsRepository to perform database operations 
 * handles converting entities to StatsResponse DTO to return user statistics to client 
*/
@Service
@RequiredArgsConstructor
public class UserStatsService {

    // injects user stats repository to perform database operations related to user statistics
    private final UserStatsRepository userStatsRepository;

    /**
     * retrieves a paginated list of user statistics
     * @param pageable pagination information (page number, page size) for results
     * calls userStatsRepository.findAll to retrieve paginated list of user statistics based on provided pagination settings
     * converts the resulting Page<UserStats> to Page<StatsResponse> using the convertToResponse method and returns it wrapped in ApiResponse to client
     * 
     */
    public Page<UserStatsResponse> getUserStats(Pageable pageable) {

        Page<UserStats> stats = userStatsRepository.findAll(pageable);
        return stats.map(this::convertToResponse);
    }

    /**
     * retrieves statistics for a specific user
     * @param userId the ID of the user for whom to retrieve statistics
     * @return the statistics for the specified user wrapped in ApiResponse
     * 
     * calls userStatsRepository.findByUserId to find the statistics for specified user ID  
     * if no statistics are found for user,ResourceNotFoundException is thrown with an appropriate message
     * if statistics are found, converts UserStats entity to a StatsResponse DTO using the convertToResponse method and returns it wrapped in ApiResponse to client
     */
    public UserStatsResponse getStatsByUserId(Long userId) {

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User stats not found"));

        return convertToResponse(stats);
    }

    /**
     * retrieves leaderboard sorted by total points
     * @param pageable pagination information (page number, page size) for results
     * @return paginated list of user statistics ordered by total points (highest first) wrapped in ApiResponse
     * 
     * calls userStatsRepository.findAllByOrderByTotalPointsDesc to retrieve a paginated list of user statistics ordered by total points in descending order based on pagination settings
     * converts the resulting Page<UserStats> to Page<StatsResponse> using the convertToResponse method and returns it wrapped in ApiResponse to client
     */
    public Page<UserStatsResponse> getLeaderboard(Pageable pageable) {

        Page<UserStats> leaderboard =
                userStatsRepository.findAllByOrderByTotalPointsDesc(pageable);

        return leaderboard.map(this::convertToResponse);
    }

    /**
     * Update a user's stats (incrementing modules completed)
     * @param userId the ID of the user whose stats we want to update
     * @return the updated statistics for user wrapped in ApiResponse
     * 
     * calls userStatsRepository.findByUserId to find the statistics for specified user ID
     * if no statistics are found for user, ResourceNotFoundException is thrown with an appropriate message
     * if statistics are found, increments the modulesCompleted field by 1 and saves the updated stats back to the database using userStatsRepository.save
     */
    @Transactional
    public UserStatsResponse incrementModulesCompleted(Long userId) {

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User stats not found"));

        stats.setModulesCompleted(stats.getModulesCompleted() + 1);
        return convertToResponse(userStatsRepository.save(stats));
    }

    /**
     * Converts UserStats entity to a StatsResponse DTO to return user statistics to client in API responses
     * maps relevant fields from UserStats entity to StatsResponse DTO
     * method is used internally by service methods to convert UserStats entities into StatsResponse DTOs 
     * 
     * @param user the UserStats entity to convert
     * @return the converted StatsResponse DTO
    */
    private UserStatsResponse convertToResponse(UserStats stats) {

        UserStatsResponse response = new UserStatsResponse();

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