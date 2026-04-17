package com.oceaniq.region.service;

import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.region.dto.response.RegionResponse;
import com.oceaniq.region.entity.Region;
import com.oceaniq.region.enums.RegionType;
import com.oceaniq.region.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
/**
 * Service responsible for handling business logic related to regions
 * Provides functionality to:
 * - Retrieve all regions
 * - Retrieve a region by ID
 * - Filter regions by ocean
 */
@Service
@RequiredArgsConstructor
public class RegionService {
    
    // injects region repository to perform database operations related to regions
    private final RegionRepository regionRepository;
    
    /**
     * Retrieve all regions sorted alphabetically by name
     * @return list of region response DTOs
     */
    public List<RegionResponse> getAllRegions() {
        return regionRepository.findAllByOrderByNameAsc().stream()
            .map(this::convertToResponse)
            .toList();
    }
    
    /**
     * Retrieve regions filtered by region type
     * @param type type of region 
     * @return list of region response DTOs
     */
    public List<RegionResponse> getRegionsByType(RegionType type) {
    return regionRepository.findByType(type).stream()
            .map(this::convertToResponse)
            .toList();
    }
    /**
     * Retrieve specific region by its ID
     * @param id ID of region
     * @return region response DTO
     * @throws ResourceNotFoundException if region is not found
     */
    public RegionResponse getRegionById(Long id) {
        Region region = regionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Region not found"));
        return convertToResponse(region);
    }
    
     /**
     * Retrieve regions belonging to a specific ocean
     * @param oceanName name of the ocean
     * @return list of region response DTOs
     */
    public List<RegionResponse> getRegionsByOcean(String oceanName) {
        return regionRepository.findByOceanName(oceanName).stream()
            .map(this::convertToResponse)
            .toList();
    }
    
    /**
     * helper method to convert Region entity into RegionResponse DTO
     * @param region region entity
     * @return mapped region response
     */
    private RegionResponse convertToResponse(Region region) {
        RegionResponse response = new RegionResponse();
        response.setId(region.getId());
        response.setName(region.getName());
        response.setDescription(region.getDescription());
        response.setCoordinates(region.getCoordinates());
        response.setOceanName(region.getOceanName());
        response.setType(region.getType());
        return response;
    }
}