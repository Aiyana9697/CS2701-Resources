package com.oceaniq.incident.dto.requests;

import com.oceaniq.incident.enums.ReportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// Request DTO for creating a new incident report (Used by users)
// Contains:
// - userId: required field for the user submitting the report
// - contractorId: required field for the associated contractor
// - regionId: required field for the region where the incident occurred
// - reportType: required field for the category of the report (e.g. FINANCIAL)
// - title: required field for the report title
// - summaryText: optional field for a detailed description of the incident

@Getter
@Setter
public class CreateIncidentReportRequest {

    @NotNull(message = "User ID is required")
    private Integer userId;

    @NotNull(message = "Contractor ID is required")
    private Integer contractorId;

    @NotNull(message = "Region ID is required")
    private Integer regionId;

    @NotNull(message = "Report type is required")
    private ReportType reportType;

    @NotBlank(message = "Title is required")
    private String title;

    private String summaryText;
}
