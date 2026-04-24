package com.oceaniq.auth.dto.response;

import com.oceaniq.user.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;

import lombok.NoArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    private String refreshToken;
    private UserResponse user;
    
    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserResponse {
        private Long id;
        private String name;
        private String email;
        private UserRole role;
        private String avatarUrl;
    }
}