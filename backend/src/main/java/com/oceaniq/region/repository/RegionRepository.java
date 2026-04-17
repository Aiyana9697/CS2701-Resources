package com.oceaniq.region.repository;

import com.oceaniq.region.entity.Region;
import com.oceaniq.region.enums.RegionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for managing Region entities
 * Provides methods to:
 * - Retrieve regions by name, ocean or type
 * - Fetch sorted lists of regions
 */
@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    
    /**
     * Retrieve a region by its unique name
     * @param name name of the region
     * @return optional containing region if found, otherwise empty
     */
    Optional<Region> findByName(String name);
    
    /**
     * Retrieve all regions belonging to specific ocean
     * @param oceanName name of the ocean
     * @return list of regions within the specified ocean
     */
    List<Region> findByOceanName(String oceanName);
    
    /**
     * Retrieve all regions of a specific type
     * @param type type of region 
     * @return list of regions matching the specified type
     */
    List<Region> findByType(RegionType type);
    
    /**
     * Retrieve all regions sorted alphabetically by name.
     * @return list of regions ordered by name in ascending order
     */
    List<Region> findAllByOrderByNameAsc();
}