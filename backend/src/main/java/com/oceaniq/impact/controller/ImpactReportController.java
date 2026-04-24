package com.oceaniq.impact.controller;

import com.oceaniq.impact.dto.request.CreateImpactReportRequest;
import com.oceaniq.impact.dto.response.ImpactReportResponse;
import com.oceaniq.impact.enums.*;
import com.oceaniq.impact.service.ImpactReportService;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.infrastructure.shared.dto.response.PaginatedResponse;
import com.oceaniq.infrastructure.security.UserPrincipal;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing Impact Reports
 * Exposes endpoints to:
 * - Retrieve impact reports with filtering and pagination
 * - Create new impact reports
 */
@RestController
@RequestMapping("/api/v1/impact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ImpactReportController {

    // injecting ImpactReportService to handle business logic related to impact reports
    private final ImpactReportService service;

    /**
     * Get impact reports with optional filters and pagination
     * @param search keyword to search report titles
     * @param impact filter by impact level (Green, Yellow, Red)
     * @param type filter by report type (EIA, REMP, etc.)
     * @param page page number (default = 0)
     * @param size number of items per page (default = 6 for UI grid)
     * @return paginated list of impact reports wrapped in ApiResponse
     * 
     * creates a Pageable object containing pagination info (page number, size)
     * calls service.getReports() to retrieve a Page of ImpactReportResponse based on filters and pagination info
     * converts the Page<ImpactReportResponse> into a PaginatedResponse<ImpactReportResponse> which includes the list of reports + pagination metadata 
     * returns a successful (HTTP 200 OK) response with the paginated list of reports wrapped inside an ApiResponse object
     * which is serialized to JSON and returned to the client
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PaginatedResponse<ImpactReportResponse>>> getReports(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) ImpactLevel impact,
            @RequestParam(required = false) ReportType type, 
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<ImpactReportResponse> reports =
                service.getReports(search, impact, type, pageable); 

        PaginatedResponse<ImpactReportResponse> response =
                new PaginatedResponse<>(
                        reports.getContent(),
                        reports.getNumber(),
                        reports.getTotalPages(),
                        reports.getTotalElements(),
                        reports.getSize()
                );

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * Create a new impact report
     * @param request request DTO containing details of the report to create
     * @param currentUser authenticated user creating the report
     * @return created ImpactReportResponse wrapped in ApiResponse
     * 
     * calls service.createReport() to create a new impact report based on the request data + ID of the authenticated user
     * returns a successful (HTTP 200 OK) response with the created report wrapped inside an ApiResponse object
     * which is serialized to JSON and returned to the client
    */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ImpactReportResponse>> createReport(
            @Valid @RequestBody CreateImpactReportRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        ImpactReportResponse response =service.createReport(request, currentUser.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.success("Report created successfully", response)
        );
    }
}
