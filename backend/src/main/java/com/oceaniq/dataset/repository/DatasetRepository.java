package com.oceaniq.dataset.repository;

import com.oceaniq.dataset.entity.Dataset;
import com.oceaniq.dataset.enums.DatasetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository  for managing Dataset entities
 * extends JpaRepository to provide basic CRUD operations and pagination support
 * defines custom query methods for searching datasets by name/uploader and filtering by status/category/uploader
 */
@Repository
public interface DatasetRepository extends JpaRepository<Dataset, Long> {
    
    /**
     * search datasets by name or uploader name (case-insensitive)
     * @param search keyword to search for in dataset / uploader name
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated list of datasets matching search criteria
    */
    @Query("SELECT d FROM Dataset d WHERE " +
           "LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.uploader.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Dataset> searchDatasets(@Param("search") String search, Pageable pageable);
    
    /**
     * Retrieve datasets filtered by status
     * @param status dataset status to filter by
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated list of datasets with specified status
    */
    Page<Dataset> findByStatus(DatasetStatus status, Pageable pageable);
    
    /**
     * Retrieve datasets filtered by category
     * @param category category to filter by
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated list of datasets in the specified category
    */
    Page<Dataset> findByCategory(String category, Pageable pageable);
    
    /**
     * Retrieve datasets uploaded by a specific user
     * @param uploaderId ID of the uploader to filter by
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated list of datasets uploaded by the specified user
    */
    Page<Dataset> findByUploaderId(Long uploaderId, Pageable pageable);
    
    /**
     * count all verified datasets
     * @return number of verified datasets
     */
    @Query("SELECT COUNT(d) FROM Dataset d WHERE d.status = 'VERIFIED'")
    Long countVerifiedDatasets();
    
    /**
     * count all pending datasets
     * @return number of pending datasets
     */
    @Query("SELECT COUNT(d) FROM Dataset d WHERE d.status = 'PENDING'")
    Long countPendingDatasets();
}