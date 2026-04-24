package com.oceaniq.species.dto.response;

import com.oceaniq.species.enums.ConservationStatus;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * DTO representing aggregated conservation statistics for species
 * Used to provide insights into species conservation statuses (e.g. endangered, vulnerable)
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConservationStatsResponse {
    
    private Long totalSpecies;
    private Map<ConservationStatus, Long> countByStatus;
    private Long endangeredCount; // ENDANGERED + CRITICALLY_ENDANGERED
    private Long threatenedCount; // VULNERABLE + ENDANGERED + CRITICALLY_ENDANGERED
    private Double endangeredPercentage;
}