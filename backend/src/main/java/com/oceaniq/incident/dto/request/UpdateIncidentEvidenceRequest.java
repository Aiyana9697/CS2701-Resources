package com.oceaniq.incident.dto.request;

import com.oceaniq.incident.enums.EvidenceType;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

// request dto for updating an existing incident evidence (used by admin/receivers)
// contains: 
// - fileName: required field for the name of the updated file
// - fileUrl: optional field for the updated URL or the path where the file is stored 
// - mimeType: optional field for the updated file format (e.g. image/png, application/pdf, etc)
// - fileSize: optional field for the updated size of the file in bytes
// - checksum: optional field for the updated checksum to verify file integrity
// - evidenceType: optional field for updating the category of evidence(e.g. PHOTO, VIDEO, DOCUMENT, etc)

@Getter
@Setter
public class UpdateIncidentEvidenceRequest {

    @NotBlank(message = "File name is required")
    private String fileName;

    private String fileUrl;
    private String mimeType;
    private Integer fileSize;
    private String checksum;
    private EvidenceType evidenceType;
}