package com.oceaniq.stats.controller;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.stats.dto.response.UserStatsResponse;
import com.oceaniq.stats.service.UserStatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for admin user statistics management
 * Provides endpoints for:
 * - Retrieving paginated user statistics
 * - Retrieving statistics for a specific user by their ID
 * - Retrieving a leaderboard of users based on their total points
 * 
 * All endpoints secured with @PreAuthorize to ensure onlyadmins can access them
 * Each response is wrapped inside ApiResponse  
*/
@RestController
@RequestMapping("/api/v1/admin/stats")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserStatsController {

    // Injecting StatsService to handle business logic related to user statistics retrieval and processing
    private final UserStatsService statsService;

    /**
     * Retrieve paginated list of user statistics
     * 
     * @param page page number for pagination (default = 0)
     * @param size number of records per page (default = 20)
     * @return paginated list of user statistics wrapped in ApiResponse
     * 
     * creates a Pageable object containing pagination info (page number / page size) 
     * object is passed to statsService.getUserStats method to retrieve paginated list of user statistics based on provided pagination settings
     * returns a successful (HTTP 200 OK) response with a list of users wrapped inside ApiResponse object, which is serialized to JSON and returned to client
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserStatsResponse>>> getUserStats(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserStatsResponse> stats = statsService.getUserStats(pageable);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    /**
     * retrieve stats for a specific user
     * 
     * @param userId ID of the user whose stats we want to retrieve
     * @return stats for the specified user wrapped in ApiResponse
     * 
     * calls statsService.getStatsByUserId method to retrieve statistics for the specified user ID
     * returns a successful (HTTP 200 OK) response with the user's statistics wrapped inside an ApiResponse object, which is serialized to JSON and returned to client
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserStatsResponse>> getUserStats(
            @PathVariable Long userId) {

        UserStatsResponse stats = statsService.getStatsByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    /**
     * retrieve leaderboard based on total points
     * 
     * @param page page number for pagination (default = 0)
     * @param size number of records per page (default = 20)
     * @return paginated list of users sorted by total points wrapped in ApiResponse
     * 
     * creates Pageable object containing pagination info (page number / page size)
     * object is passed to statsService.getLeaderboard method to retrieve paginated list of users sorted by total points based on provided pagination settings
     * returns a successful (HTTP 200 OK) response with a list of users wrapped inside an ApiResponse object, which is serialized to JSON and returned to client
     */
    @GetMapping("/leaderboard")
    public ResponseEntity<ApiResponse<Page<UserStatsResponse>>> getLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserStatsResponse> leaderboard = statsService.getLeaderboard(pageable);
        return ResponseEntity.ok(ApiResponse.success(leaderboard));
    }

}