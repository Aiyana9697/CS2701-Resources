package com.oceaniq.region.controller;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.region.dto.response.RegionResponse;
import com.oceaniq.region.enums.RegionType;
import com.oceaniq.region.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for handling region-related API requests
 * Provides endpoints to:
 * - Retrieve all regions
 * - Retrieve a region by ID
 * - Filter regions by ocean
 */
@RestController
@RequestMapping("/api/v1/regions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RegionController {
    
    // Injecting RegionService to handle business logic related to regions
    private final RegionService regionService;
    
    /**
     * Retrieve all regions
     * @return HTTP 200 response containing a list of regions
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<RegionResponse>>> getAllRegions() {
        List<RegionResponse> regions = regionService.getAllRegions();
        return ResponseEntity.ok(ApiResponse.success(regions));
    }

    /**
     * Retrieve a specific region by its type
     * @param type type of region
     * @return HTTP 200 response containing the region
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<RegionResponse>>> getRegionsByType(@PathVariable RegionType type) {
    List<RegionResponse> regions = regionService.getRegionsByType(type);
    return ResponseEntity.ok(ApiResponse.success(regions));
}
    
    /**
     * Retrieve a specific region by its ID
     * @param id ID of the region
     * @return HTTP 200 response containing the region
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RegionResponse>> getRegionById(@PathVariable Long id) {
        RegionResponse region = regionService.getRegionById(id);
        return ResponseEntity.ok(ApiResponse.success(region));
    }
    
    /**
     * Retrieve regions belonging to a specific ocean
     * @param oceanName name of the ocean
     * @return HTTP 200 response containing a list of matching regions
     */
    @GetMapping("/ocean/{oceanName}")
    public ResponseEntity<ApiResponse<List<RegionResponse>>> getRegionsByOcean(
            @PathVariable String oceanName) {
        List<RegionResponse> regions = regionService.getRegionsByOcean(oceanName);
        return ResponseEntity.ok(ApiResponse.success(regions));
    }
}