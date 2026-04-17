package com.oceaniq.saved.dto.response;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Response DTO representing summary of user's saved items
 * Provides total counts of saved items by type, used for dashboards / quick overviews
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SavedItemSummary {
    
    private Long totalSaved;
    private Long datasetsCount;
    private Long discussionsCount;
    private Long portalContentCount;
    private Long modulesCount;
}
