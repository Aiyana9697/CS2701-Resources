package com.oceaniq.dataset.controller;

import com.oceaniq.dataset.dto.request.CreateDatasetRequest;
import com.oceaniq.user.dto.request.FlagRequest;
import com.oceaniq.dataset.dto.response.DatasetResponse;
import com.oceaniq.dataset.enums.DatasetStatus;
import com.oceaniq.dataset.service.DatasetService;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.infrastructure.shared.dto.response.PaginatedResponse;
import com.oceaniq.infrastructure.security.UserPrincipal;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * controller responsible for mangaging datasets
 * provides endpoints for:
 * - retrieving datasets with optional filtering / sorting / pagination
 * - retrieving a specific dataset by ID
 * - creating a new dataset (authenticated users)
 * - updating dataset status / flagging dataset for review / deleting dataset (admin only)
 * - incrementing dataset download count (when a user downloads a dataset)
*/
@RestController
@RequestMapping("/api/v1/datasets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DatasetController {
    
    // injecting DatasetService to handle business logic related to datasets
    private final DatasetService datasetService;
    
    /**
     * Retrieves paginated list of datasets with optional search, status and category filtering
     *
     * @param search optional keyword to search datasets by title / description (case-insensitive)
     * @param status optional filter for dataset status (VERIFIED, PENDING, FLAGGED)
     * @param category optional filter for dataset category
     * @param page page number (default: 0)
     * @param size number of items per page (default: 20)
     * @param sortBy field to sort by (default: uploadDate)
     * @param sortOrder sort order (default: DESC)
     * @return paginated response of DatasetResponse DTOs
     * 
     * tenerary operator used to create Sort object
     * if sortOrder is "ASC", list is sorted ascending by sortBy field, 
     * if sortOrder is not "ASC" ("DESC"), list is sorted descending by sortBy field
     * 
     * creates a Pageable object containing pagination info (page number, size, sort info) 
     * calls datasetService.getDatasets() to retrieve paginated list of datasets based on filters and pagination info
     * converts the Page<DatasetResponse> returned by service into a PaginatedResponse<DatasetResponse>
     * returns a successful (HTTP 200 OK) response with a list of datasets wrapped inside a ApiResponse object, which is serialized to JSON and returned
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PaginatedResponse<DatasetResponse>>> getDatasets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) DatasetStatus status,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "uploadDate") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder) {
        
        Sort sort = sortOrder.equalsIgnoreCase("ASC") 
            ? Sort.by(sortBy).ascending() 
            : Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<DatasetResponse> datasets = datasetService.getDatasets(
            search, status, category, pageable);
        
        PaginatedResponse<DatasetResponse> response = new PaginatedResponse<>(
            datasets.getContent(),
            datasets.getNumber(),
            datasets.getTotalPages(),
            datasets.getTotalElements(),
            datasets.getSize()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * Retrieves a dataset by its ID
     * @param id ID of the dataset to retrieve
     * @return ApiResponse containing the dataset data if found, or an error message if not found
     * 
     * calls datasetService.getDatasetById() to retrieve dataset by ID
     * if dataset is found, returns a successful (HTTP 200 OK) response with the dataset data wrapped inside an ApiResponse object
     * if dataset is not found, throws ResourceNotFoundException which results in an error response being returned to the client
    */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DatasetResponse>> getDatasetById(@PathVariable Long id) {
        DatasetResponse dataset = datasetService.getDatasetById(id);
        return ResponseEntity.ok(ApiResponse.success(dataset));
    }

    /**
     * Creates a new dataset
     * @param request the dataset creation request containing dataset details
     * @param currentUser the authenticated user creating the dataset
     * @return ApiResponse containing the created dataset data if successful, or an error message if creation fails
     * 
     * calls datasetService.createDataset() with the creation request and authenticated user's ID to create a new dataset
     * if creation is successful, returns a successful (HTTP 201 Created) response with the created dataset data wrapped inside an ApiResponse object
     * if creation fails (e.g. due to validation errors), throws an exception which results in an error response being returned to the client
    */
    @PostMapping
    public ResponseEntity<ApiResponse<DatasetResponse>> createDataset(
            @Valid @RequestBody CreateDatasetRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        DatasetResponse dataset = datasetService.createDataset(request, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Dataset created successfully", dataset));
    }
    
    /**
     * Updates the status of a dataset (admin only)
     * @param id ID of the dataset to update
     * @param status new status to set for the dataset
     * @return ApiResponse containing the updated dataset data if successful, or an error message if update fails
     * 
     * calls datasetService.updateDatasetStatus() with the dataset ID and new status to update the dataset's status
     * if update is successful, returns a successful (HTTP 200 OK) response with the updated dataset data wrapped inside an ApiResponse object
     * if update fails (e.g. due to invalid status), throws an exception which results in an error response being returned to the client
    */
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DatasetResponse>> updateDatasetStatus(
            @PathVariable Long id,
            @RequestParam DatasetStatus status) {
        DatasetResponse dataset = datasetService.updateDatasetStatus(id, status);
        return ResponseEntity.ok(
            ApiResponse.success("Dataset status updated successfully", dataset));
    }
    
    /**
     * Flags a dataset for review (admin only)
     * @param id ID of the dataset to flag
     * @param request the flagging request containing details about the flag (e.g. reason for flagging)
     * @return ApiResponse containing the flagged dataset data if successful, or an error message if flagging fails
     * 
     * calls datasetService.flagDataset() with the dataset ID and flagging request to flag the dataset for review
     * if flagging is successful, returns a successful (HTTP 200 OK) response with the flagged dataset data wrapped inside an ApiResponse object
     * if flagging fails (e.g. due to invalid dataset ID), throws an exception which results in an error response being returned to the client
    */
    @PutMapping("/{id}/flag")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DatasetResponse>> flagDataset(
            @PathVariable Long id,
            @RequestBody FlagRequest request) {
        DatasetResponse dataset = datasetService.flagDataset(id, request);
        return ResponseEntity.ok(ApiResponse.success("Dataset flagged successfully", dataset));
    }
    
    /**
     * Deletes a dataset by its ID (admin only)
     * @param id ID of the dataset to delete
     * @return ApiResponse indicating success or failure of the deletion operation
     * 
     * calls datasetService.deleteDataset() with the dataset ID to delete the dataset
     * if deletion is successful, returns a successful (HTTP 200 OK) response with a message indicating the dataset was deleted successfully
     * if deletion fails (e.g. due to invalid dataset ID), throws an exception which results in an error response being returned to the client
    */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteDataset(@PathVariable Long id) {
        datasetService.deleteDataset(id);
        return ResponseEntity.ok(ApiResponse.success("Dataset deleted successfully", null));
    }
    
    /**
     * Increments the download count for a dataset by its ID
     * @param id ID of the dataset to update
     * @return ApiResponse indicating success or failure of the operation
     * 
     * calls datasetService.incrementDownloadCount() with the dataset ID to increment its download count
     * if update is successful, returns a successful (HTTP 200 OK) response with a message indicating the download count was incremented successfully
     * if update fails (e.g. due to invalid dataset ID), throws an exception which results in an error response being returned to the client
    */
    @PostMapping("/{id}/download")
    public ResponseEntity<ApiResponse<Void>> downloadDataset(@PathVariable Long id) {
        datasetService.incrementDownloadCount(id);
        return ResponseEntity.ok(ApiResponse.success("Download count incremented", null));
    }
}