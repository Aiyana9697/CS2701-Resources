package main.java.com.oceaniq.incident.dto.response;

import com.oceaniq.incident.enums.EvidenceType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

// Response DTO representing incident evidence info returned by the API
// object is sent to the client instead of the IncidentEvidence entity
// to control what data is exposed

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IncidentEvidenceResponse {

    private Integer fileId;
    private Integer reportId;
    private String fileName;
    private String fileUrl;
    private String mimeType;
    private Integer fileSize;
    private String checksum;
    private Date uploadedAt;
    private EvidenceType evidenceType;
}
