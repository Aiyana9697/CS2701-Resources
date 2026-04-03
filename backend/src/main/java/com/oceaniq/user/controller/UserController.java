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
 * Controller responsible for admin-level user management
 * 
 * Provides endpoints for: 
 * - Retrieving users with pagination & filtering
 * - Viewing user details,
 * - Flagging users for moderation
 * - Deleting users
 * - Updating user roles
 */
@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    /**
     * Retrieves a paginated list of users with optional filters: 
     * - search: filters users by name or email
     * - role: filters users by their role
     * - status: filters users by their status
     * 
     * @param search optional search filter for name/email
     * @param role optional filter for user role
     * @param status optional filter for user status
     * @param page page number for pagination (default: 0)
     * @param size page size for pagination (default: 20)
     * @return paginated list of users matching the filters
     * 
     * creates a Pageable object containing pagination information (page number / page size) 
     * object is passed to userService.getUsers method to retrieve paginated list of users based on provided filters & pagination settings
     * returns a successful (HTTP 200 OK) response with a list of users wrapped inside a ApiResponse object, which is serialized to JSON and returned to the client
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
     * Retrieves a specific user by their ID
     * @param userId the ID of the user to retrieve
     * @return the user details if found, otherwise a 404 error
     * 
     * Calls userService.getUserById with the provided userId to get user's details from database
     * If user is found, a successful (HTTP 200 OK) response is returrned with the user info wrapped inside a ApiResponse object, which is serialized to JSON and returned to the client
     * If user is not found, ResourceNotFoundException is thrown which results in a 404 Not Found response
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long userId) { 

        UserResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    /**
     * Flag a user for moderation
     * @param userId the ID of the user to flag
     * @param request the flagging details (reason, comments)
     * @return the updated user details after flagging
     * 
     * Calls userService.flagUser with provided userId and flagging details to update user's status in database
     * If user is successfully flagged, a successful (HTTP 200 OK) response is returned with the updated user info wrapped inside a ApiResponse object, which is serialized to JSON and returned to the client
     * If user is not found, ResourceNotFoundException is thrown which results in a 404 Not Found response
     */
    @PutMapping("/{userId}/flag")
    public ResponseEntity<ApiResponse<UserResponse>> flagUser(
            @PathVariable Long userId,
            @RequestBody FlagRequest request) {

        UserResponse user = userService.flagUser(userId, request);
        return ResponseEntity.ok(ApiResponse.success("User flagged successfully", user));
    }

    /**
     * Delete a user from the system
     * @param userId the ID of the user to delete
     * @return a success message if deletion is successful
     * 
     * Calls userService.deleteUser with provided userId to remove user from database
     * If user is successfully deleted, a successful (HTTP 200 OK) response is returned with a success message wrapped inside a ApiResponse object, which is serialized to JSON and returned to the client
     * If user is not found, ResourceNotFoundException is thrown which results in a 404 Not Found response
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long userId) {

        userService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    /**
     * Update a user's role (e.g user --> admin)
     * @param userId the ID of the user to update
     * @param request the new role to assign to the user
     * @return the updated user details after role change
     * 
     * Calls userService.updateUserRole with provided userId and new role to update user's role in database
     * If user's role is successfully updated, a successful (HTTP 200 OK) response is
     * returned with the updated user info wrapped inside an ApiResponse object, which is serialized to JSON and returned to the client
     * If user is not found, ResourceNotFoundException is thrown which results in a 404 Not Found response
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