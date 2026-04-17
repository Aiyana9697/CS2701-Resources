package com.oceaniq.saved.repository;

import com.oceaniq.saved.entity.SavedItem;
import com.oceaniq.saved.enums.ItemType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for managing SavedItem entities
 * Provides methods to:
 * - Retrieve saved items for a user
 * - Filter saved items by type
 * - Check if an item is already saved
 * - Fetch specific saved items
*/
@Repository
public interface SavedItemRepository extends JpaRepository<SavedItem, Long> {
    
    /**
     * Retrieve all saved items for specific user with pagination.
     *
     * @param userId ID of user
     * @param pageable pagination configuration
     * @return paginated list of saved items
    */
    Page<SavedItem> findByUserId(Long userId, Pageable pageable);
    
    /**
     * Retrieve saved items for a user filtered by item type
     *
     * @param userId ID of user
     * @param itemType type of saved item 
     * @param pageable pagination configuration
     * @return paginated list of filtered saved items
     */
    Page<SavedItem> findByUserIdAndItemType(
        Long userId, ItemType itemType, Pageable pageable);
    
    /**
     * Retrieve a specific saved item by user, type and item ID to locate an existing saved record
     * @param userId ID of the user
     * @param itemType type of saved item
     * @param itemId ID of the saved item
     * @return optional containing the saved item if found, otherwise empty
     */
    Optional<SavedItem> findByUserIdAndItemTypeAndItemId(
        Long userId, ItemType itemType, Long itemId);
    
    /**
     * Check if a user has already saved a specific item.
     * @param userId ID of the user
     * @param itemType type of saved item
     * @param itemId ID of the saved item
     * @return true if the item is already saved, otherwise false
     */
    Boolean existsByUserIdAndItemTypeAndItemId(Long userId, ItemType itemType, Long itemId);

    /**
     * Count total number of saved items for a user
     * @param userId ID of the user
     * @return total number of saved items
     */
    Long countByUserId(Long userId);
    
    /**
     * Count number of saved items for a user filtered by item type.
     * @param userId ID of the user
     * @param itemType type of saved item
     * @return total number of saved items of the specified type
     */
    Long countByUserIdAndItemType(Long userId, ItemType itemType);
    
    /**
     * Retrieve most recently saved items for a user
     * @param userId ID of the user
     * @param pageable pagination configuration
     * @return paginated list of recently saved items ordered by saved date (descending)
     */
    @Query("SELECT s FROM SavedItem s WHERE s.user.id = :userId ORDER BY s.savedAt DESC")
    Page<SavedItem> findRecentByUser(@Param("userId") Long userId, Pageable pageable);
    
    /**
     * Delete a specific saved item by user, type, and item ID.
     * @param userId ID of the user
     * @param itemType type of saved item
     * @param itemId ID of the saved item
     */
    void deleteByUserIdAndItemTypeAndItemId(Long userId, ItemType itemType, Long itemId);
}

