package com.oceaniq.species.controller;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.infrastructure.shared.dto.response.PaginatedResponse;
import com.oceaniq.species.dto.response.ConservationStatsResponse;
import com.oceaniq.species.dto.response.SpeciesResponse;
import com.oceaniq.species.dto.response.SpeciesSummary;
import com.oceaniq.species.enums.*;
import com.oceaniq.species.service.SpeciesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/species")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SpeciesController {
    
    private final SpeciesService speciesService;
    
    /**
     * Get all species with pagination and filtering
     * supports optional filters: search by name, filter by category, conservation status, habitat type and threat type
     * supports pagination (page number, page size) and sorting (sort by field and sort order)
     * returns a paginated response containing list of species matching the filters and pagination metadata
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PaginatedResponse<SpeciesResponse>>> getSpecies(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) SpeciesCategory category,
            @RequestParam(required = false) ConservationStatus conservationStatus,
            @RequestParam(required = false) HabitatType habitat,
            @RequestParam(required = false) ThreatType threat,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "commonName") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortOrder) {
        
        Sort sort = sortOrder.equalsIgnoreCase("ASC") 
            ? Sort.by(sortBy).ascending() 
            : Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<SpeciesResponse> species = speciesService.getSpecies(
            search, category, conservationStatus, habitat, threat, pageable);
        
        PaginatedResponse<SpeciesResponse> response = new PaginatedResponse<>(
            species.getContent(),
            species.getNumber(),
            species.getTotalPages(),
            species.getTotalElements(),
            species.getSize()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * Get all species as simple list (for dropdowns)
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<SpeciesSummary>>> getAllSpecies() {
        List<SpeciesSummary> species = speciesService.getAllSpeciesSummary();
        return ResponseEntity.ok(ApiResponse.success(species));
    }
    
    /**
     * Get species by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SpeciesResponse>> getSpeciesById(@PathVariable Long id) {
        SpeciesResponse species = speciesService.getSpeciesById(id);
        return ResponseEntity.ok(ApiResponse.success(species));
    }
    
    /**
     * Get species by scientific name
     */
    @GetMapping("/scientific/{scientificName}")
    public ResponseEntity<ApiResponse<SpeciesResponse>> getSpeciesByScientificName(
            @PathVariable String scientificName) {
        SpeciesResponse species = speciesService.getSpeciesByScientificName(scientificName);
        return ResponseEntity.ok(ApiResponse.success(species));
    }
    
    /**
     * Get featured species
     */
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<SpeciesResponse>>> getFeaturedSpecies() {
        List<SpeciesResponse> species = speciesService.getFeaturedSpecies();
        return ResponseEntity.ok(ApiResponse.success(species));
    }
    
    /**
     * Get all species categories
     */
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<SpeciesCategory>>> getCategories() {
        List<SpeciesCategory> categories = speciesService.getCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }
    
    /**
     * Get all habitats
     */
    @GetMapping("/habitats")
    public ResponseEntity<ApiResponse<List<HabitatType>>> getHabitats() {
        List<HabitatType> habitats = speciesService.getHabitats();
        return ResponseEntity.ok(ApiResponse.success(habitats));
    }
    
    /**
     * Get conservation statistics
     */
    @GetMapping("/conservation/stats")
    public ResponseEntity<ApiResponse<ConservationStatsResponse>> getConservationStats() {
        ConservationStatsResponse stats = speciesService.getConservationStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
