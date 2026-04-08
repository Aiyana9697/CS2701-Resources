package main.java.com.oceaniq.incident.Service;

import com.oceaniq.incident.dto.request.CreateIncidentEvidenceRequest;
import com.oceaniq.incident.dto.request.UpdateIncidentEvidenceRequest;
import com.oceaniq.incident.dto.response.IncidentEvidenceResponse;
import com.oceaniq.incident.entity.IncidentEvidence;
import com.oceaniq.incident.repository.IncidentEvidenceRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service layer responsible for business logic related to incident evidence
 *
 * Provides methods for:
 * - Retrieving all evidence files
 * - Retrieving a single evidence file by ID
 * - Retrieving a single evidence file by file name
 * - Uploading a new evidence file
 * - Updating an existing evidence file's details
 * - Deleting an evidence file
 *
 * Service methods interact with IncidentEvidenceRepository to perform database operations
 * and handle converting entities to IncidentEvidenceResponse DTOs to return data to the client
 */
@Service
@RequiredArgsConstructor
public class IncidentEvidenceService {

    private final IncidentEvidenceRepository incidentEvidenceRepository;

    /**
     * Retrieves all incident evidence files
     * calls incidentEvidenceRepository.findAll to retrieve all evidence files
     * converts each IncidentEvidence entity to IncidentEvidenceResponse DTO using convertToResponse method
     *
     * @return list of all evidence files
     */
    public List<IncidentEvidenceResponse> getAllEvidence() {
        return StreamSupport
                .stream(incidentEvidenceRepository.findAll().spliterator(), false)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a single evidence file by its ID
     * calls incidentEvidenceRepository.findById to find evidence with specified ID
     * if evidence is not found throws ResourceNotFoundException
     * if evidence is found, converts IncidentEvidence entity to IncidentEvidenceResponse DTO
     *
     * @param fileId the ID of the evidence file to retrieve
     * @return the evidence file details if found, otherwise a 404 error
     */
    public IncidentEvidenceResponse getEvidenceById(Integer fileId) {
        IncidentEvidence evidence = incidentEvidenceRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident evidence not found"));

        return convertToResponse(evidence);
    }

    /**
     * Retrieves a single evidence file by its file name
     * calls incidentEvidenceRepository.findByFileName to find evidence with specified file name
     * if evidence is not found throws ResourceNotFoundException
     * if evidence is found, converts IncidentEvidence entity to IncidentEvidenceResponse DTO
     *
     * @param fileName the file name of the evidence to retrieve
     * @return the evidence file details if found, otherwise a 404 error
     */
    public IncidentEvidenceResponse getEvidenceByFileName(String fileName) {
        IncidentEvidence evidence = incidentEvidenceRepository.findByFileName(fileName);

        if (evidence == null) {
            throw new ResourceNotFoundException("Incident evidence not found");
        }

        return convertToResponse(evidence);
    }

    /**
     * Uploads a new incident evidence file
     * maps fields from CreateIncidentEvidenceRequest DTO to a new IncidentEvidence entity
     * sets uploadedAt to the current date and time
     * saves the new evidence using incidentEvidenceRepository.save
     * converts saved IncidentEvidence entity to IncidentEvidenceResponse DTO and returns it
     *
     * @param request the details of the evidence file to upload
     * @return the created evidence file details
     */
    @Transactional
    public IncidentEvidenceResponse createEvidence(CreateIncidentEvidenceRequest request) {
        IncidentEvidence evidence = new IncidentEvidence();

        evidence.setReportId(request.getReportId());
        evidence.setFileName(request.getFileName());
        evidence.setFileUrl(request.getFileUrl());
        evidence.setMimeType(request.getMimeType());
        evidence.setFileSize(request.getFileSize());
        evidence.setChecksum(request.getChecksum());
        evidence.setEvidenceType(request.getEvidenceType());
        evidence.setUploadedAt(new Date());

        return convertToResponse(incidentEvidenceRepository.save(evidence));
    }

    /**
     * Updates the details of an existing evidence file
     * calls incidentEvidenceRepository.findById to find evidence with specified ID
     * if evidence is not found throws ResourceNotFoundException
     * if evidence is found, updates the relevant fields and saves using incidentEvidenceRepository.save
     * converts updated IncidentEvidence entity to IncidentEvidenceResponse DTO and returns it
     *
     * @param fileId the ID of the evidence file to update
     * @param request the updated details for the evidence file
     * @return the updated evidence file details
     */
    @Transactional
    public IncidentEvidenceResponse updateEvidence(Integer fileId, UpdateIncidentEvidenceRequest request) {
        IncidentEvidence evidence = incidentEvidenceRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident evidence not found"));

        evidence.setFileName(request.getFileName());
        evidence.setFileUrl(request.getFileUrl());
        evidence.setMimeType(request.getMimeType());
        evidence.setFileSize(request.getFileSize());
        evidence.setChecksum(request.getChecksum());
        evidence.setEvidenceType(request.getEvidenceType());

        return convertToResponse(incidentEvidenceRepository.save(evidence));
    }

    /**
     * Permanently deletes an evidence file by its ID
     * calls incidentEvidenceRepository.findById to find evidence with specified ID
     * if evidence is not found throws ResourceNotFoundException
     * if evidence is found, deletes it using incidentEvidenceRepository.delete
     *
     * @param fileId the ID of the evidence file to delete
     */
    @Transactional
    public void deleteEvidence(Integer fileId) {
        IncidentEvidence evidence = incidentEvidenceRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident evidence not found"));

        incidentEvidenceRepository.delete(evidence);
    }

    /**
     * Converts an IncidentEvidence entity to an IncidentEvidenceResponse DTO
     * maps relevant fields from the entity to the response DTO
     * used internally by service methods to return evidence data to the client
     *
     * @param evidence the IncidentEvidence entity to convert
     * @return the converted IncidentEvidenceResponse DTO
     */
    private IncidentEvidenceResponse convertToResponse(IncidentEvidence evidence) {
        IncidentEvidenceResponse response = new IncidentEvidenceResponse();

        response.setFileId(evidence.getFileId());
        response.setReportId(evidence.getReportId());
        response.setFileName(evidence.getFileName());
        response.setFileUrl(evidence.getFileUrl());
        response.setMimeType(evidence.getMimeType());
        response.setFileSize(evidence.getFileSize());
        response.setChecksum(evidence.getChecksum());
        response.setUploadedAt(evidence.getUploadedAt());
        response.setEvidenceType(evidence.getEvidenceType());

        return response;
    }
}
