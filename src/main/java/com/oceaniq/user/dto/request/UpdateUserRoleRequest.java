package com.oceaniq.user.dto.request;

import com.oceaniq.user.enums.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class UpdateUserRoleRequest {
    
    @NotNull(message = "Role is required")
    private UserRole role;
}