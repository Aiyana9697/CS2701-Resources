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
     * 
     * JPQL query finds datasets where search term appears either in dataset / uploader / region / species name (case-insensitive)
     * selects distinct datasets to avoid duplicates when multiple species match search term
     * left joins datasets with species and includes datasets even if they have no species (left join)
     */
    @Query("SELECT DISTINCT d FROM Dataset d LEFT JOIN d.species s WHERE " +
           "LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.uploader.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.region.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.commonName) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Dataset> searchDatasets(@Param("search") String search, Pageable pageable);

    @Query("""
           SELECT DISTINCT d
           FROM Dataset d
           LEFT JOIN d.species s
           WHERE (:search IS NULL OR
                  LOWER(d.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
                  LOWER(d.uploader.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
                  LOWER(d.region.name) LIKE LOWER(CONCAT('%', :search, '%')) OR
                  LOWER(s.commonName) LIKE LOWER(CONCAT('%', :search, '%')))
             AND (:status IS NULL OR d.status = :status)
             AND (:category IS NULL OR d.category = :category)
             AND (:regionId IS NULL OR d.region.id = :regionId)
             AND (:speciesId IS NULL OR s.id = :speciesId)
           """)
    // this single query powers the dataset list endpoint and conditionally applies only the filters that were supplied
    Page<Dataset> findAllWithFilters(
            @Param("search") String search,
            @Param("status") DatasetStatus status,
            @Param("category") String category,
            @Param("regionId") Long regionId,
            @Param("speciesId") Long speciesId,
            Pageable pageable);
    
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
     * count datasets associated with a specific species
     * @param speciesId ID of the species to count datasets for
     * @return number of datasets linked to the specified species
    */
    Long countBySpecies_Id(Long speciesId);
    
    /**
     * Retrieve datasets uploaded by a specific user
     * @param uploaderId ID of the uploader to filter by
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated list of datasets uploaded by the specified user
    */
    // Spring Data generates this query from the method name, so no custom JPQL is needed here
    Page<Dataset> findByUploaderId(Long uploaderId, Pageable pageable);
    
    /**
     * count datasets by their status
     * @param status dataset status to count
     * @return number of datasets with the specified status
    */
    Long countByStatus(DatasetStatus status);
}
