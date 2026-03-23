package com.oceaniq.user.repository;

import com.oceaniq.user.enums.UserRole;
import com.oceaniq.user.enums.UserStatus;
import com.oceaniq.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<User> searchUsers(@Param("search") String search, Pageable pageable);
    
    Page<User> findByRole(UserRole role, Pageable pageable);
    
    Page<User> findByStatus(UserStatus status, Pageable pageable);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'USER' AND u.status = 'ACTIVE'")
    Long countActiveUsers();
}