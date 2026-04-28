package com.oceaniq.species.repository;

import com.oceaniq.species.entity.Species;
import com.oceaniq.species.enums.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for managing Species entities
 * Provides methods to:
 * - Retrieve species by unique identifiers (name)
 * - Filter species by category, habitat, conservation status
 * - Search species by text fields
 * - Retrieve featured species
 * - Aggregate / count species data
 */

@Repository
public interface SpeciesRepository extends JpaRepository<Species, Long>, JpaSpecificationExecutor<Species> {
    
    /**
     * Retrieve species by its scientific name
     * @param scientificName unique scientific name
     * @return optional containing species if found
     */
    Optional<Species> findByScientificName(String scientificName);
    
    /**
     * Retrieve species by its common name
     * @param commonName common name of species
     * @return optional containing species if found
     */
    Optional<Species> findByCommonName(String commonName);
    
    /**
     * Retrieve species filtered by category
     * @param category species category enum
     * @param pageable pagination configuration
     * @return paginated list of species
     */
    Page<Species> findBySpeciesCategory(SpeciesCategory category, Pageable pageable);    
    /**
     * Retrieve species filtered by conservation status
     * @param status conservation status enum
     * @param pageable pagination configuration
     * @return paginated list of species
     */
    Page<Species> findByConservationStatus(ConservationStatus status, Pageable pageable);
    
/**
     * Retrieve species filtered by habitat
     * @param habitat habitat enum
     * @param pageable pagination configuration
     * @return paginated list of species
     */
    Page<Species> findByHabitat(HabitatType habitat, Pageable pageable);


    /**
     * Retrieve species affected by a specific threat
     * Uses JOIN to combine species & theats table to filter species by their threats 
     * @param threat threat type enum
     * @param pageable pagination configuration
     * @return paginated list of species
     */
    @Query("SELECT s FROM Species s JOIN s.threats t WHERE t = :threat")
    Page<Species> findByThreat(@Param("threat") ThreatType threats, Pageable pageable);


    /**
     * Search species by common name or scientific name
     * @param search search keyword
     * @param pageable pagination configuration
     * @return paginated list of matching species
     */
    @Query("SELECT s FROM Species s WHERE " +
           "LOWER(s.commonName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.scientificName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.speciesCategory) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Species> searchSpecies(@Param("search") String search, Pageable pageable);
    
    @Query("""
    SELECT DISTINCT s FROM Species s
    LEFT JOIN s.threats t
    WHERE (
        :search IS NULL
        OR LOWER(s.commonName) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(s.scientificName) LIKE LOWER(CONCAT('%', :search, '%'))
    )
    AND (:category IS NULL OR s.speciesCategory = :category)
    AND (:conservationStatus IS NULL OR s.conservationStatus = :conservationStatus)
    AND (:habitat IS NULL OR s.habitat = :habitat)
    AND (:threat IS NULL OR t = :threat)
""")
    Page<Species> findAllWithFilters(
            @Param("search") String search,
            @Param("category") SpeciesCategory category,
            @Param("conservationStatus") ConservationStatus conservationStatus,
            @Param("habitat") HabitatType habitat,
            @Param("threat") ThreatType threat,
            Pageable pageable
    );
    /**
     * Retrieve all featured species
     * @return list of featured species
     */
    @Query("SELECT s FROM Species s WHERE s.isFeatured = true")
    List<Species> findFeaturedSpecies();
    
    /**
     * Retrieve all species sorted alphabetically by common name
     * @return ordered list of species
     */
    @Query("SELECT s FROM Species s ORDER BY s.commonName ASC")
    List<Species> findAllOrderByCommonName();
    
    /**
     * Retrieve distinct species categories
     * @return list of unique category enums
     */
    @Query("SELECT DISTINCT s.speciesCategory FROM Species s ORDER BY s.speciesCategory")
    List<SpeciesCategory> findDistinctCategories();
    
    /**
     * Retrieve distinct habitats
     * @return list of unique habitat enums
     */
    @Query("SELECT DISTINCT s.habitat FROM Species s WHERE s.habitat IS NOT NULL ORDER BY s.habitat")
    List<HabitatType> findDistinctHabitats();
    
    /**
     * Count species by conservation status.
     * @param status conservation status enum
     * @return number of species matching status
     */
    Long countByConservationStatus(ConservationStatus status);
}
