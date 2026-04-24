package com.oceaniq.incident.controller;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.incident.dto.request.CreateIncidentEvidenceRequest;
import com.oceaniq.incident.dto.request.UpdateIncidentEvidenceRequest;
import com.oceaniq.incident.dto.response.IncidentEvidenceResponse;
import com.oceaniq.incident.service.IncidentEvidenceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IncidentEvidenceController {

    private final IncidentEvidenceService incidentEvidenceService;

    public IncidentEvidenceController(IncidentEvidenceService incidentEvidenceService) {
        this.incidentEvidenceService = incidentEvidenceService;
    }

    @GetMapping("/reportfile")
    public ResponseEntity<ApiResponse<List<IncidentEvidenceResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(incidentEvidenceService.getAllEvidence()));
    }

    @PostMapping("/reportfile")
    public ResponseEntity<ApiResponse<IncidentEvidenceResponse>> add(@Valid @RequestBody CreateIncidentEvidenceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Evidence created successfully", incidentEvidenceService.createEvidence(request)));
    }

    @GetMapping("/reportfile/{id}")
    public ResponseEntity<ApiResponse<IncidentEvidenceResponse>> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(incidentEvidenceService.getEvidenceById(id)));
    }

    @DeleteMapping("/reportfile/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        incidentEvidenceService.deleteEvidence(id);
        return ResponseEntity.ok(ApiResponse.success("Report file deleted", null));
    }

    @PutMapping("/reportfile/{id}")
    public ResponseEntity<ApiResponse<IncidentEvidenceResponse>> update(@PathVariable Integer id,
            @Valid @RequestBody UpdateIncidentEvidenceRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Evidence updated successfully", incidentEvidenceService.updateEvidence(id, request)));
    }

    @GetMapping("/reportfile/findByFileName")
    public ResponseEntity<ApiResponse<IncidentEvidenceResponse>> findByFileName(
            @RequestParam(value = "fileName", required = false) String fileName) {
        if (fileName == null || fileName.isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("File name is required"));
        }
        return ResponseEntity.ok(ApiResponse.success(incidentEvidenceService.getEvidenceByFileName(fileName)));
    }
}
