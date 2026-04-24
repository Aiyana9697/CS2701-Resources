package com.oceaniq.species.dto.response;

import com.oceaniq.species.enums.*; 
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;

import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;


/**
 * Response DTO representing species data returned to the client
 * Contains structured species info including classification,
 * habitat, diet, threats, and metadata 
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SpeciesResponse {
    
    private Long id;
    private String commonName;
    private String scientificName;
    private SpeciesCategory category;
    private ConservationStatus conservationStatus;
    private String description;
    private String imageUrl;
    private HabitatType habitat;
    private String averageSize;
    private String averageLifespan;
    private DietType diet;
    private Set<ThreatType> threats;
    private Boolean isFeatured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long datasetCount; // Number of datasets about this species
}