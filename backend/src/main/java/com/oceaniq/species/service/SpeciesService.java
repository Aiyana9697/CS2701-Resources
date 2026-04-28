package com.oceaniq.species.service;

import com.oceaniq.dataset.repository.DatasetRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.species.dto.response.ConservationStatsResponse;
import com.oceaniq.species.dto.response.SpeciesResponse;
import com.oceaniq.species.dto.response.SpeciesSummary;
import com.oceaniq.species.entity.Species;
import com.oceaniq.species.enums.*;
import com.oceaniq.species.repository.SpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.JoinType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service responsible for handling business logic related to Species
 * Responsibilities:
 * - Retrieve species with filtering and pagination
 * - Provide lookup data (categories, habitats)
 * - Fetch individual species details
 * - Provide featured species for UI highlights
 * - Calculate conservation stats
 */
@Service
@RequiredArgsConstructor
public class SpeciesService {
    
    private final SpeciesRepository speciesRepository;
    private final DatasetRepository datasetRepository;
    
    /**
     * Retrieve species with optional filtering and pagination
     * @param search keyword to search by name (common/scientific)
     * @param category species biological category
     * @param conservationStatus conservation classification
     * @param habitat natural habitat of species
     * @param threat specific threat affecting species
     * @param pageable pagination and sorting configuration
     * @return paginated list of SpeciesResponse DTOs
     */
    @Transactional(readOnly = true)
    public Page<SpeciesResponse> getSpecies(
        String search,
        SpeciesCategory category,
        ConservationStatus conservationStatus,
        HabitatType habitat,
        ThreatType threat,
        Pageable pageable) {

        Specification<Species> specification = buildSpeciesSpecification(
                search, category, conservationStatus, habitat, threat);

        return speciesRepository.findAll(specification, pageable).map(this::convertToResponse);
    }

    private Specification<Species> buildSpeciesSpecification(
            String search,
            SpeciesCategory category,
            ConservationStatus conservationStatus,
            HabitatType habitat,
            ThreatType threat) {

        String normalizedSearch = (search == null || search.isBlank()) ? null : search.trim().toLowerCase();

        return (root, query, criteriaBuilder) -> {
            var predicate = criteriaBuilder.conjunction();

            if (normalizedSearch != null) {
                String pattern = "%" + normalizedSearch + "%";
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.or(
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("commonName")), pattern),
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("scientificName")), pattern)
                        )
                );
            }

            if (category != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("speciesCategory"), category));
            }

            if (conservationStatus != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("conservationStatus"), conservationStatus));
            }

            if (habitat != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("habitat"), habitat));
            }

            if (threat != null) {
                if (query != null) {
                    query.distinct(true);
                }
                var threatJoin = root.join("threats", JoinType.LEFT);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(threatJoin, threat));
            }

            return predicate;
        };
    }

    /**
     * Retrievs all species in a summary format     *
     * @return list of SpeciesSummary DTOs
     */
    public List<SpeciesSummary> getAllSpeciesSummary() {
        return speciesRepository.findAllOrderByCommonName().stream()
            .map(this::convertToSummary)
            .toList();
    }
    
    /**
     * Retrieve a single species by its ID
     * @param id species ID
     * @return SpeciesResponse DTO
     * @throws ResourceNotFoundException if species does not exist
     */
    public SpeciesResponse getSpeciesById(Long id) {
        Species species = speciesRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Species not found"));
        return convertToResponse(species);
    }

    /**
     * Retrieves a species by its scientific name
     * @param scientificName unique scientific name
     * @return SpeciesResponse DTO
     * @throws ResourceNotFoundException if not found
     */
    public SpeciesResponse getSpeciesByScientificName(String scientificName) {
        Species species = speciesRepository.findByScientificName(scientificName)
            .orElseThrow(() -> new ResourceNotFoundException("Species not found"));
        return convertToResponse(species);
    }
    
    /**
     * Retrieve all featured species
     * Featured species are highlighted in the UI
     * @return list of featured species
     */
    public List<SpeciesResponse> getFeaturedSpecies() {
        return speciesRepository.findFeaturedSpecies().stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    /**
     * Retrieve all unique species categories
     * Used for filters in frontend
     * @return list of SpeciesCategory enums
     */
    public List<SpeciesCategory> getCategories() {
        return speciesRepository.findDistinctCategories();
    }
    
    /**
     * Retrieve all unique habitat types
     * @return list of HabitatType enums
     */
    public List<HabitatType> getHabitats() {
        return speciesRepository.findDistinctHabitats();
    }
    
    /**
     * Calculate conservation statistics across all species\
     *
     * Includes:
     * - Total species count
     * - Count per conservation status
     * - Endangered & threatened totals
     * - Percentage of endangered species
     *
     * @return ConservationStatsResponse DTO
     */
    public ConservationStatsResponse getConservationStats() {
        Long total = speciesRepository.count();
        
        Map<ConservationStatus, Long> countByStatus = new HashMap<>();
        for (ConservationStatus status : ConservationStatus.values()) {
            Long count = speciesRepository.countByConservationStatus(status);
            countByStatus.put(status, count);
        }
        
        Long endangered = countByStatus.getOrDefault(ConservationStatus.ENDANGERED, 0L);
        Long criticallyEndangered = countByStatus.getOrDefault(ConservationStatus.CRITICALLY_ENDANGERED, 0L);
        Long vulnerable = countByStatus.getOrDefault(ConservationStatus.VULNERABLE, 0L);
        
        Long endangeredCount = endangered + criticallyEndangered;
        Long threatenedCount = vulnerable + endangered + criticallyEndangered;
        
        Double endangeredPercentage = total > 0 ? (endangeredCount * 100.0 / total) : 0.0; 
        
        return new ConservationStatsResponse(
            total,
            countByStatus,
            endangeredCount,
            threatenedCount,
            endangeredPercentage
        );
    }
    
    private SpeciesResponse convertToResponse(Species species) {
        SpeciesResponse response = new SpeciesResponse();
        response.setId(species.getId());
        response.setCommonName(species.getCommonName());
        response.setScientificName(species.getScientificName());
        response.setCategory(species.getSpeciesCategory());
        response.setConservationStatus(species.getConservationStatus());
        response.setDescription(species.getDescription());
        response.setImageUrl(species.getImageUrl());
        response.setHabitat(species.getHabitat());
        response.setAverageSize(species.getAverageSize());
        response.setAverageLifespan(species.getAverageLifespan());
        response.setDiet(species.getDiet());
        response.setThreats(species.getThreats());
        response.setIsFeatured(species.getIsFeatured());
        response.setCreatedAt(species.getCreatedAt());
        response.setUpdatedAt(species.getUpdatedAt());
        
        return response;
    }
    
    private SpeciesSummary convertToSummary(Species species) {
        return new SpeciesSummary(
            species.getId(),
            species.getCommonName(),
            species.getScientificName(),
            species.getSpeciesCategory(),
            species.getConservationStatus(),
            species.getImageUrl(),
            species.getIsFeatured()
        );
    }
}
