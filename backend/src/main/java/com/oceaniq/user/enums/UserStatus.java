package com.oceaniq.user.enums;

/**
 * Enum representing user account status in the system
 * - ACTIVE: user account is active (user can log in and access platform)
 * - INACTIVE: user account is inactive (e.g. user's account is deactivated)
 * - FLAGGED: user account is flagged for review (e.g. due to suspicious activity, malicious intent)
*/
public enum UserStatus {
    ACTIVE,
    INACTIVE,
    FLAGGED
}