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

/**
 * Repository responsible for database operations related to user 
 * extends JpaRepository to provide basic CRUD operations and pagination
*/
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Finds a user by their email address (optional as user may not exist)
     * used for authentication / looking up an account
     * @param email the email address to search for
     * @return Optional containing the user if found, or empty if not found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Checks if user with the given email already exists in database
     * @param email the email address to check 
     * @return true if email is taken, false if available
     */
    Boolean existsByEmail(String email);

    /**
     * Searches users by name or email using a case-insensitive search term
     * returns paginated list of users whose name / email contains search term
     * @param search search term to filter users by name or email (case-insensitive)
     * @param pageable pagination information (page number, page size) for results
     * @return paginated list of users matching search criteria
    */
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<User> searchUsers(@Param("search") String search, Pageable pageable);
    
    /**
     * Finds users by their assigned role (USER, ADMIN) with pagination
     * @param role the user role to filter by
     * @param pageable pagination information for results
     * @return paginated list of users with specified role
     */
    Page<User> findByRole(UserRole role, Pageable pageable);
    
    /**
     * Finds users by their account status (ACTIVE, INACTIVE, FLAGGED) with pagination
     * @param status the user status to filter by
     * @param pageable pagination information for results
     * @return paginated list of users with specified status
     */
    Page<User> findByStatus(UserStatus status, Pageable pageable);
    
    /**
     * Counts number of active users in system (users with role USER and status ACTIVE)
     * @return the count of active users
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'USER' AND u.status = 'ACTIVE'")
    Long countActiveUsers();
}