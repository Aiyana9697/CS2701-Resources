package com.oceaniq.impact.dto.response;

import com.oceaniq.impact.enums.*;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO for returning impact report data in API responses
 * Includes fields for report ID, title, type, impact level and uploader's name
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImpactReportResponse {

    private Long id;
    private String title;
    private ReportType reportType;
    private ImpactLevel impact;
    private String uploadedBy;
    private Long regionId;
    private String regionName;
}
