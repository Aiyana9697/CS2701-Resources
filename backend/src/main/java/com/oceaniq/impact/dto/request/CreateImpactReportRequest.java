package com.oceaniq.impact.dto.request;

import com.oceaniq.impact.enums.ImpactLevel;
import com.oceaniq.impact.enums.ReportType;
import lombok.Setter;
import lombok.Getter;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO for creating a new impact report. 
 * Contains necessary fields to create a report
 * including title, impact level, report type and region
*/
@Setter
@Getter
public class CreateImpactReportRequest {

    @NotBlank
    private String title;

    @NotNull
    private ImpactLevel impact;

    @NotNull
    private ReportType reportType;

    @NotNull
    private Long regionId;
}
