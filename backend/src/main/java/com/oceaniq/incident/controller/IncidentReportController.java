package com.oceaniq.incident.controller;

import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.incident.dto.request.CreateIncidentReportRequest;
import com.oceaniq.incident.dto.request.UpdateIncidentReportStatusRequest;
import com.oceaniq.incident.dto.response.IncidentReportResponse;
import com.oceaniq.incident.service.IncidentReportService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IncidentReportController {

    private final IncidentReportService incidentReportService;

    public IncidentReportController(IncidentReportService incidentReportService) {
        this.incidentReportService = incidentReportService;
    }

    @GetMapping("/report")
    public ResponseEntity<ApiResponse<List<IncidentReportResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(incidentReportService.getAllReports()));
    }

    @PostMapping("/report")
    public ResponseEntity<ApiResponse<IncidentReportResponse>> add(@Valid @RequestBody CreateIncidentReportRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Report created successfully", incidentReportService.createReport(request)));
    }

    @GetMapping("/report/{id}")
    public ResponseEntity<ApiResponse<IncidentReportResponse>> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success(incidentReportService.getReportById(id)));
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        incidentReportService.deleteReport(id);
        return ResponseEntity.ok(ApiResponse.success("Report deleted", null));
    }

    @PatchMapping("/report/{id}/status")
    public ResponseEntity<ApiResponse<IncidentReportResponse>> updateStatus(@PathVariable Integer id,
            @Valid @RequestBody UpdateIncidentReportStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Report status updated", incidentReportService.updateReportStatus(id, request)));
    }

    @GetMapping("/report/findByTitle")
    public ResponseEntity<ApiResponse<IncidentReportResponse>> findByTitle(
            @RequestParam(value = "title", required = false) String title) {
        if (title == null || title.isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Title is required"));
        }
        return ResponseEntity.ok(ApiResponse.success(incidentReportService.getReportByTitle(title)));
    }
}
