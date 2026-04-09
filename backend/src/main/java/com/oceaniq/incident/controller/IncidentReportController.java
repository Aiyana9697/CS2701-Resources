package com.oceaniq.incident.controller;

import com.oceaniq.incident.dto.request.CreateIncidentReportRequest;
import com.oceaniq.incident.dto.request.UpdateIncidentReportStatusRequest;
import com.oceaniq.incident.dto.response.IncidentReportResponse;
import com.oceaniq.incident.entity.IncidentReport;
import com.oceaniq.incident.service.IncidentReportService;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class IncidentReportController {

    private final IncidentReportService incidentReportService;

    public IncidentReportController(IncidentReportService incidentReportService) {
        this.incidentReportService = incidentReportService;
    }

    @GetMapping("/report")
    public ResponseEntity<List<IncidentReportResponse>> getAll() {
        return ResponseEntity.ok(incidentReportService.getAllReports());
    }

    @PostMapping("/report")
    public ResponseEntity<IncidentReportResponse> add(@Valid @RequestBody CreateIncidentReportRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(incidentReportService.createReport(request));
    }

    @GetMapping("/report/{id}")
    public ResponseEntity<IncidentReportResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(incidentReportService.getReportById(id));
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        incidentReportService.deleteReport(id);
        return ResponseEntity.ok("Report deleted");
    }

    @PatchMapping("/report/{id}/status")
    public ResponseEntity<IncidentReportResponse> updateStatus(@PathVariable Integer id,
            @Valid @RequestBody UpdateIncidentReportStatusRequest request) {
        return ResponseEntity.ok(incidentReportService.updateReportStatus(id, request));
    }

    @GetMapping("/report/findByTitle")
    public ResponseEntity<IncidentReportResponse> findByTitle(
            @RequestParam(value = "title", required = false) String title) {
        if (title == null || title.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(incidentReportService.getReportByTitle(title));
    }

    @GetMapping("/report/{id}/assessment")
    public ResponseEntity<?> getAssessment(@PathVariable Integer id) {
        IncidentReport report = incidentReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
        // Fetch report entity from database
        String impact = impactAssessmentService.calculateImpactLevel(report);
        // Calculate impact level using service logic
        String compliance = impactAssessmentService.evaluateCompliance(report);
        // Evaluate compliance status
        return ResponseEntity.ok(Map.of(
                "impactLevel", impact,
                "complianceStatus", compliance));
    } // Return results as JSON response
}
