package com.oceaniq.species.dto.response;

import com.oceaniq.species.enums.ConservationStatus;
import com.oceaniq.species.enums.SpeciesCategory;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SpeciesSummary {
    
    private Long id;
    private String commonName;
    private String scientificName;
    private SpeciesCategory category;
    private ConservationStatus conservationStatus;
    private String imageUrl;
    private Boolean isFeatured;
}