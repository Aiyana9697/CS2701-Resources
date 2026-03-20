package com.oceaniq.user.controller;

import com.oceaniq.user.dto.request.FlagRequest;
import com.oceaniq.user.dto.request.UpdateUserRoleRequest;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.user.dto.response.UserResponse;
import com.oceaniq.user.enums.UserRole;
import com.oceaniq.user.enums.UserStatus;
import com.oceaniq.user.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for admin user management.
 * Allows admins to view, update, flag, and delete users.
 */
@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    /**
     * Get a paginated list of users.
     * Optional filters: search, role, status.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UserRole role,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<UserResponse> users = userService.getUsers(search, role, status, pageable);

        return ResponseEntity.ok(ApiResponse.success(users));
    }

    /**
     * Get a specific user by ID.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long userId) {

        UserResponse user = userService.getUserById(userId);

        return ResponseEntity.ok(ApiResponse.success(user));
    }

    /**
     * Flag a user for moderation.
     */
    @PutMapping("/{userId}/flag")
    public ResponseEntity<ApiResponse<UserResponse>> flagUser(
            @PathVariable Long userId,
            @RequestBody FlagRequest request) {

        UserResponse user = userService.flagUser(userId, request);

        return ResponseEntity.ok(ApiResponse.success("User flagged successfully", user));
    }

    /**
     * Delete a user from the system.
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long userId) {

        userService.deleteUser(userId);

        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    /**
     * Update a user's role (e.g., USER -> ADMIN).
     */
    @PutMapping("/{userId}/role")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(
            @PathVariable Long userId,
            @RequestBody UpdateUserRoleRequest request) {

        UserResponse user = userService.updateUserRole(userId, request.getRole());

        return ResponseEntity.ok(
                ApiResponse.success("User role updated successfully", user));
    }
}