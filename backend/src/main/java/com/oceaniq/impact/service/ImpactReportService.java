package com.oceaniq.impact.service;

import com.oceaniq.impact.dto.response.ImpactReportResponse;
import com.oceaniq.impact.entity.ImpactReport;
import com.oceaniq.impact.dto.request.CreateImpactReportRequest;
import com.oceaniq.user.repository.UserRepository;
import com.oceaniq.user.entity.User;

import com.oceaniq.impact.enums.*;
import com.oceaniq.impact.repository.ImpactReportRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.region.repository.RegionRepository;
import com.oceaniq.region.entity.Region;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service responsible for handling business logic related to impact reports
 * Handles:
 * - Retrieving reports with filtering and pagination
 * - Creating new impact reports
 * - Mapping entities to response DTOs
*/
@Service
@RequiredArgsConstructor
public class ImpactReportService {

    // injecting repositories for managing impact reports, users and regions
    private final ImpactReportRepository repository;
    private final UserRepository userRepository;
    private final RegionRepository regionRepository;

    /**
     * Retrieve impact reports with optional filtering and pagination
     * @param search keyword to search by report title
     * @param impact filter by impact level (Green, Yellow, Red)
     * @param type filter by report type (EIA, REMP APEI)
     * @param pageable pagination configuration (page, size, sorting)
     * @return paginated list of ImpactReportResponse DTOs
     */
    public Page<ImpactReportResponse> getReports(
            String search,
            ImpactLevel impact,
            ReportType type,
            Pageable pageable) {

        Page<ImpactReport> reports;

        /**
         * if search keyword is provided, filters reports by title containing the keyword (case-insensitive)
         * if impact level is provided, filters reports by impact level
         * if report type is provided, filters reports by type
         * if no filters are provided, returns all reports paginated
         * converts ImpactReport entities to ImpactReportResponse DTOs and returns paginated result
        */
        if (search != null && !search.isBlank()) {
            reports = repository.findByTitleContainingIgnoreCase(search, pageable);
        } else if (impact != null) {
            reports = repository.findByImpact(impact, pageable);
        } else if (type != null) {
            reports = repository.findByReportType(type, pageable);
        } else {
            reports = repository.findAll(pageable);
        }

        return reports.map(this::convertToResponse);
    }

    /**
     * Create a new impact report
     * @param request DTO containing report details
     * @param userId ID of the user creating the report
     * @return created ImpactReportResponse DTO
     * 
     * fetches the user and region entities based on IDs provided in the request
     * if user or region is not found, throws ResourceNotFoundException
     * creates a new ImpactReport entity, sets its properties based on the request and associated user and region
     * saves the new report to the database and returns the created report as a DTO
     */
    @Transactional
    public ImpactReportResponse createReport(CreateImpactReportRequest request, Long userId) {

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Region region = regionRepository.findById(request.getRegionId())
            .orElseThrow(() -> new ResourceNotFoundException("Region not found"));

        ImpactReport report = new ImpactReport();
        report.setTitle(request.getTitle());
        report.setImpact(request.getImpact());
        report.setReportType(request.getReportType());
        report.setRegion(region);
        report.setUploadedBy(user);

        report = repository.save(report);
        return convertToResponse(report);
    }

    /**
     * Convert ImpactReport entity into response DTO
     * @param report ImpactReport entity
     * @return ImpactReportResponse DTO
     */
    private ImpactReportResponse convertToResponse(ImpactReport report) {
        return new ImpactReportResponse(
                report.getId(),
                report.getTitle(),
                report.getReportType(),
                report.getImpact(),
                report.getUploadedBy().getName(),
                report.getRegion().getId(),
                report.getRegion().getName());
    }

}