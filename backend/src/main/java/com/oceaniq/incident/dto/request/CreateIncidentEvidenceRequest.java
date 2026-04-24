package com.oceaniq.incident.dto.request;

import com.oceaniq.incident.enums.EvidenceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

// request dto for creating a new piece of evidence for an incident report (used by reporters)
// contains:
// - reportId: required field for the report this evidence belongs to
// - fileName: required field for the name of the uploaded file
// - fileUrl: optional field for the URL or the path where the file is stored 
// - mimeType: optional field for the file format (e.g. image/png, application/pdf, etc)
// - fileSize: optional field for the size of the file in bytes
// - checksum: optional field for verifying file integrity
// - evidenceType: optional field for categorising the type of evidence(e.g. PHOTO, VIDEO, DOCUMENT, etc)

@Getter
@Setter
public class CreateIncidentEvidenceRequest {

    @NotNull(message = "Report ID is required")
    private Integer reportId;

    @NotBlank(message = "File name is required")
    private String fileName;

    private String fileUrl;
    private String mimeType;
    private Integer fileSize;
    private String checksum;
    private EvidenceType evidenceType;
}