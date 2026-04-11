package com.oceaniq.infrastructure.security;

import com.oceaniq.user.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collections;
import java.util.Collection;

/**
 * Custom implementation of UserDetails used by Spring Security
 * Wraps the application's User entity and provides authentication / authorisation info such as creds / roles
 */
@Getter
@RequiredArgsConstructor
public class UserPrincipal implements UserDetails {

    private final Long id;
    private final String name;
    private final String email;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    /**
     * takes a user entity and creates a UserPrincipal instance for Spring Security
     * maps the users role to a GrantedAuthority format (ROLE_ADMI or ROLE_USER) 
     * copies relevant user info (id, name, email, password) into the UserPrincipal instance so Spring can handle login and permissions
     */
     public static UserPrincipal create(User user) {
        Collection<GrantedAuthority> authorities = Collections.singleton(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );
        
        return new UserPrincipal(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPasswordHash(),
            authorities
        );
    }

     /**
     * Returns username used for authentication (user's email)
     */
    @Override
    public String getUsername() {
        return email;
    }
    
    /**
     * Returns user's password for authentication
     */
    @Override
    public String getPassword() {
        return password;
    }
    
    /**
     * Returns authorities (roles) granted to user
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    /**
     * Indicates whether account has expired (Returns true if the account is valid)
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    /**
     * Indicates whether account is locked (returns true if the account is not locked)
     * Returning true means the account is not locked.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    /**
     * Indicates whether the user's credentials have expired (returns true if the credentials are valid)
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    /**
     * Indicates whether user is enabled (returns true if the account is active)
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}