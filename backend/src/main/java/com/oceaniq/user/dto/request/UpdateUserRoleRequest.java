package com.oceaniq.user.dto.request;

import com.oceaniq.user.enums.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;
import lombok.Getter;

/**
 * Request DTO for updating a user's role (used by admins)
 * 
 * Contains:
 * - role: required field for the new role to assign to the user (message is returned if role is missing in request)
*/
@Getter
@Setter
public class UpdateUserRoleRequest {
    
    @NotNull(message = "Role is required")
    private UserRole role;
}