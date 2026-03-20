package com.oceaniq.user.dto.response;

import com.oceaniq.user.enums.UserRole;
import com.oceaniq.user.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private UserStatus status;
    private LocalDate joinDate;
    private LocalDateTime lastLogin;
    private String avatarUrl;
    private Integer modulesCompleted;
    private Integer datasetsUploaded;
    private LocalDateTime createdAt;
}