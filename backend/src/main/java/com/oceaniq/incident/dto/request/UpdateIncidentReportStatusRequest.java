package com.oceaniq.incident.dto.request;

import com.oceaniq.incident.enums.ReportStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// request dto for updating the status of an existing incident report (used by admin/receivers)
// contains:
// -  status: required field for the new status to assign to the report 
// e.g (SUBMITTED, APPROVED, etc)
// message is returned if the status is missing or invalid

@Getter
@Setter
public class UpdateIncidentReportStatusRequest {

    @NotNull(message = "Status is required")
    private ReportStatus status;
}