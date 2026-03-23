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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return convertToResponse(user);
    }

    @Transactional
    public UserResponse flagUser(Long userId, FlagRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setStatus(UserStatus.FLAGGED);

        return convertToResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }

    @Transactional
    public UserResponse updateUserRole(Long userId, UserRole role) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setRole(role);

        return convertToResponse(userRepository.save(user));
    }

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