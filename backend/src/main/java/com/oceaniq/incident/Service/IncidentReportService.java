package main.java.com.oceaniq.incident.Service;

import com.oceaniq.incident.dto.request.CreateIncidentReportRequest;
import com.oceaniq.incident.dto.request.UpdateIncidentReportStatusRequest;
import com.oceaniq.incident.dto.response.IncidentReportResponse;
import com.oceaniq.incident.entity.IncidentReport;
import com.oceaniq.incident.enums.ReportStatus;
import com.oceaniq.incident.repository.IncidentReportRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service layer responsible for business logic related to incident reports
 *
 * Provides methods for:
 * - Retrieving all incident reports
 * - Retrieving a single report by ID
 * - Retrieving a report by title
 * - Creating a new incident report
 * - Updating the status of an incident report
 * - Deleting an incident report
 *
 * Service methods interact with IncidentReportRepository to perform database
 * operations
 * and handle converting entities to IncidentReportResponse DTOs to return data
 * to the client
 */
@Service
@RequiredArgsConstructor
public class IncidentReportService {

    private final IncidentReportRepository incidentReportRepository;

    /**
     * Retrieves all incident reports
     * calls incidentReportRepository.findAll to retrieve all reports
     * converts each IncidentReport entity to IncidentReportResponse DTO using
     * convertToResponse method
     *
     * @return list of all incident reports
     */
    public List<IncidentReportResponse> getAllReports() {
        return StreamSupport
                .stream(incidentReportRepository.findAll().spliterator(), false)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a single incident report by its ID
     * calls incidentReportRepository.findById to find report with specified ID
     * if report is not found throws ResourceNotFoundException
     * if report is found, converts IncidentReport entity to IncidentReportResponse
     * DTO
     *
     * @param reportId the ID of the report to retrieve
     * @return the report details if found, otherwise a 404 error
     */
    public IncidentReportResponse getReportById(Integer reportId) {
        IncidentReport report = incidentReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident report not found"));

        return convertToResponse(report);
    }

    /**
     * Retrieves a single incident report by its title
     * calls incidentReportRepository.findByTitle to find report with specified
     * title
     * if report is not found throws ResourceNotFoundException
     * if report is found, converts IncidentReport entity to IncidentReportResponse
     * DTO
     *
     * @param title the title of the report to retrieve
     * @return the report details if found, otherwise a 404 error
     */
    public IncidentReportResponse getReportByTitle(String title) {
        IncidentReport report = incidentReportRepository.findByTitle(title);

        if (report == null) {
            throw new ResourceNotFoundException("Incident report not found");
        }

        return convertToResponse(report);
    }

    /**
     * Creates a new incident report
     * maps fields from CreateIncidentReportRequest DTO to a new IncidentReport
     * entity
     * sets the initial status to DRAFT
     * saves the new report using incidentReportRepository.save
     * converts saved IncidentReport entity to IncidentReportResponse DTO and
     * returns it
     *
     * @param request the details of the report to create
     * @return the created report details
     */
    @Transactional
    public IncidentReportResponse createReport(CreateIncidentReportRequest request) {
        IncidentReport report = new IncidentReport();

        report.setUserId(request.getUserId());
        report.setContractorId(request.getContractorId());
        report.setRegionId(request.getRegionId());
        report.setReportType(request.getReportType());
        report.setTitle(request.getTitle());
        report.setSummaryText(request.getSummaryText());
        report.setStatus(ReportStatus.DRAFT);

        return convertToResponse(incidentReportRepository.save(report));
    }

    /**
     * Updates the status of an existing incident report
     * calls incidentReportRepository.findById to find report with specified ID
     * if report is not found throws ResourceNotFoundException
     * if report is found, updates the report's status and saves it using
     * incidentReportRepository.save
     * converts updated IncidentReport entity to IncidentReportResponse DTO and
     * returns it
     *
     * @param reportId the ID of the report to update
     * @param request  the new status to assign to the report
     * @return the updated report details
     */
    @Transactional
    public IncidentReportResponse updateReportStatus(Integer reportId, UpdateIncidentReportStatusRequest request) {
        IncidentReport report = incidentReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident report not found"));

        report.setStatus(request.getStatus());

        return convertToResponse(incidentReportRepository.save(report));
    }

    /**
     * Permanently deletes an incident report by its ID
     * calls incidentReportRepository.findById to find report with specified ID
     * if report is not found throws ResourceNotFoundException
     * if report is found, deletes it using incidentReportRepository.delete
     *
     * @param reportId the ID of the report to delete
     */
    @Transactional
    public void deleteReport(Integer reportId) {
        IncidentReport report = incidentReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident report not found"));

        incidentReportRepository.delete(report);
    }

    /**
     * Converts an IncidentReport entity to an IncidentReportResponse DTO
     * maps relevant fields from the entity to the response DTO
     * used internally by service methods to return report data to the client
     *
     * @param report the IncidentReport entity to convert
     * @return the converted IncidentReportResponse DTO
     */
    private IncidentReportResponse convertToResponse(IncidentReport report) {
        IncidentReportResponse response = new IncidentReportResponse();

        response.setReportId(report.getReportId());
        response.setUserId(report.getUserId());
        response.setContractorId(report.getContractorId());
        response.setRegionId(report.getRegionId());
        response.setReportType(report.getReportType());
        response.setTitle(report.getTitle());
        response.setSummaryText(report.getSummaryText());
        response.setStatus(report.getStatus());
        response.setSubmittedAt(report.getSubmittedAt());
        response.setCreatedAt(report.getCreatedAt());

        return response;
    }
}
