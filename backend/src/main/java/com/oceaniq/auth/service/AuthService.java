package com.oceaniq.auth.service;

import com.oceaniq.auth.dto.request.*;
import com.oceaniq.auth.dto.response.AuthResponse;
import com.oceaniq.user.entity.User;
import com.oceaniq.user.enums.UserRole;
import com.oceaniq.user.enums.UserStatus;
import com.oceaniq.stats.entity.UserStats;
import com.oceaniq.infrastructure.exception.BadRequestException;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.user.repository.UserRepository;
import com.oceaniq.stats.repository.UserStatsRepository;
import com.oceaniq.infrastructure.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already in use");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail()); // still used as username
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.ACTIVE);
        user.setJoinDate(LocalDate.now());
        
        user = userRepository.save(user);
        
        // create stats
        UserStats stats = new UserStats();
        stats.setUser(user);
        userStatsRepository.save(stats);
        
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String token = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        
        return new AuthResponse(token, refreshToken, convertToUserResponse(user));
    }
    
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        String token = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);
        
        return new AuthResponse(token, refreshToken, convertToUserResponse(user));
    }
    
    private AuthResponse.UserResponse convertToUserResponse(User user) {
        return new AuthResponse.UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(), // still returned
            user.getRole(),
            user.getAvatarUrl()
        );
    }
}