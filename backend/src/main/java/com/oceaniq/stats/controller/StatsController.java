package com.oceaniq.stats.controller;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.stats.dto.response.StatsResponse;
import com.oceaniq.stats.service.StatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for admin user statistics management.
 * Allows admins to view user stats and leaderboard data.
 */
@RestController
@RequestMapping("/api/v1/admin/stats")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class StatsController {

    private final StatsService statsService;

    /**
     * Get paginated list of user statistics.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<StatsResponse>>> getUserStats(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<StatsResponse> stats = statsService.getUserStats(pageable);

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    /**
     * Get stats for a specific user.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<StatsResponse>> getUserStatsByUserId(
            @PathVariable Long userId) {

        StatsResponse stats = statsService.getStatsByUserId(userId);

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    /**
     * Get leaderboard based on total points.
     */
    @GetMapping("/leaderboard")
    public ResponseEntity<ApiResponse<Page<StatsResponse>>> getLeaderboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<StatsResponse> leaderboard = statsService.getLeaderboard(pageable);

        return ResponseEntity.ok(ApiResponse.success(leaderboard));
    }

}