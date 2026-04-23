package com.oceaniq.incident.controller;

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
    public ResponseEntity<List<IncidentEvidenceResponse>> getAll() {
        return ResponseEntity.ok(incidentEvidenceService.getAllEvidence());
    }

    @PostMapping("/reportfile") 
    public ResponseEntity<IncidentEvidenceResponse> add(@Valid @RequestBody CreateIncidentEvidenceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(incidentEvidenceService.createEvidence(request));
    }

    @GetMapping("/reportfile/{id}")  // find a report file based on the report file's ID
    public ResponseEntity<IncidentEvidenceResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(incidentEvidenceService.getEvidenceById(id));
    }

    @DeleteMapping("/reportfile/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        incidentEvidenceService.deleteEvidence(id);
        return ResponseEntity.ok("Report file deleted");
    }

    @PutMapping("/reportfile/{id}")
    public ResponseEntity<IncidentEvidenceResponse> update(@PathVariable Integer id,
            @Valid @RequestBody UpdateIncidentEvidenceRequest request) {
        return ResponseEntity.ok(incidentEvidenceService.updateEvidence(id, request));
    }

    @GetMapping("/reportfile/findByFileName")
    public ResponseEntity<IncidentEvidenceResponse> findByFileName(
            @RequestParam(value = "fileName", required = false) String fileName) {
        if (fileName == null || fileName.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(incidentEvidenceService.getEvidenceByFileName(fileName));
    }
}
