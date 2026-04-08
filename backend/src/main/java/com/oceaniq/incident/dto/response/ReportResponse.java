package com.oceaniq.incident.dto.response;

import com.oceaniq.incident.enums.ReportStatus;
import com.oceaniq.incident.enums.ReportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

// Response DTO representing incident report info returned by the API
// object is sent to the client instead of the IncidentReport entity 
// to control what data is exposed


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IncidentReportResponse {

    private Integer reportId;
    private Integer userId;
    private Integer contractorId;
    private Integer regionId;
    private ReportType reportType;
    private String title;
    private String summaryText;
    private ReportStatus status;
    private Date submittedAt;
    private Date createdAt;
}
