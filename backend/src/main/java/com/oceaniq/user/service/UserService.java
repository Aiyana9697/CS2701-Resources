package com.oceaniq.user.service;

import com.oceaniq.user.dto.request.FlagRequest;
import com.oceaniq.user.dto.response.UserResponse;
import com.oceaniq.user.enums.UserRole;
import com.oceaniq.user.enums.UserStatus;
import com.oceaniq.user.entity.User;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**Service layer responsible for buisness logic related to users
 * 
 * Provides methods for:
 * - Retrieving users with pagination & filtering
 * - Viewing user details,
 * - Flagging users for moderation
 * - Deleting users
 * - Updating user roles
 * 
 * Service methods interact with UserRepository to perform database operations 
 * handles converting entities to UserResponse DTO to return user data to client 
*/
@Service
@RequiredArgsConstructor
public class UserService {

    // injects user repository to perform database operations related to users
    private final UserRepository userRepository;

    /**
     * Retries a paginated list of users using optional filters: 
     * - search: filters users by name or email
     * - role: filters users by their role
     * - status: filters users by their status
     * 
     * if search parameter is provided, calls userRepository.searchUsers to find users matching search term in their name or email
     * if role parameter is provided, calls userRepository.findByRole to find users with specified role
     * if status parameter is provided, calls userRepository.findByStatus to find users with specified status
     * if no filters are provided, calls userRepository.findAll to retrieve all users with pagination
     * converts the resulting Page<User> to Page<UserResponse> using the convertToResponse method and returns it
     * 
     * @param search optional search filter for name/email
     * @param role optional filter for user role
     * @param status optional filter for user status
     * @param pageable pagination information (page number, page size, sorting)
     * @return paginated list of users matching the filters
     */
    public Page<UserResponse> getUsers(String search, UserRole role,
        UserStatus status, Pageable pageable) {
        Page<User> users;

        if (search != null && !search.isBlank()) {
            users = userRepository.searchUsers(search, pageable);
        } else if (role != null) {
            users = userRepository.findByRole(role, pageable);
        } else if (status != null) {
            users = userRepository.findByStatus(status, pageable);
        } else {
            users = userRepository.findAll(pageable);
        }
        return users.map(this::convertToResponse);
    }



    /**
     * Retrieves a single user by their ID
     * calls userRepository.findById to find user with specified ID
     * if user is not found throws ResourceNotFoundException
     * if user is found, converts User entity to UserResponse DTO using convertToResponse method
     * 
     * @param userId the ID of the user to retrieve
     * @return the user details if found, otherwise a 404 error
    */
    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return convertToResponse(user);
    }

    /**
     * Flags a user for moderation 
     * calls userRepository.findById to find user with specified ID
     * if user is not found throws ResourceNotFoundException
     * if user is found, updates user's status to FLAGGED and saves updated user using userRepository.save
     * converts updated User entity to UserResponse DTO using convertToResponse method and returns it
     * 
     * @param userId the ID of the user to flag
     * @param request the flagging details (e.g. reason for flagging)
     * @return the updated user details after flagging
    */

    @Transactional
    public UserResponse flagUser(Long userId, FlagRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setStatus(UserStatus.FLAGGED);
        return convertToResponse(userRepository.save(user));
    }

    /**
     * Permanently deletes a user by their ID
     * calls userRepository.findById to find user with specified ID
     * if user is not found throws ResourceNotFoundException
     * if user is found, deletes user using userRepository.delete
     * @param userId the ID of the user to delete
     * @return a success message if user has been deleted successfully, otherwise 404 error if user is not found
     *
    */
    @Transactional
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }

    /**
     * Updates a user's role (e.g. from user to admin or vice versa)
     * calls userRepository.findById to find user with specified ID
     * if user is not found throws ResourceNotFoundException
     * if user is found, updates user's role to new role provided and saves updated user using userRepository.save
     * converts updated User entity to UserResponse DTO using convertToResponse method and returns it
     * @param userId the ID of user to update
     * @param role the new role to assign to user
     * @return the updated user details after role change, otherwise 404 error if user is not found
    */
    @Transactional
    public UserResponse updateUserRole(Long userId, UserRole role) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setRole(role);
        return convertToResponse(userRepository.save(user));
    }

    /**
     * Converts User entity to a UserResponse DTO to return user details to client
     * maps relevant fields from User entity to UserResponse DTO
     * This method is used internally by service methods to convert User entities into UserResponse DTOs that are returned to client in API responses
     * It ensures that only relevant user details are exposed to client and allows for consistent formatting of user data in API responses

     * @param user the User entity to convert
     * @return the converted UserResponse DTO
    */
    private UserResponse convertToResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setJoinDate(user.getJoinDate());
        response.setLastLogin(user.getLastLogin());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setCreatedAt(user.getCreatedAt());
        
        return response;
    }
}