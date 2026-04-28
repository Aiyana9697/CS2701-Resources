package com.oceaniq.dataset.service;

import com.oceaniq.dataset.dto.request.CreateDatasetRequest;
import com.oceaniq.dataset.dto.response.DatasetResponse;
import com.oceaniq.dataset.enums.DatasetStatus;
import com.oceaniq.dataset.entity.Dataset;
import com.oceaniq.dataset.repository.DatasetRepository;
import com.oceaniq.user.entity.User;
import com.oceaniq.user.repository.UserRepository;
import com.oceaniq.user.dto.request.FlagRequest;
import com.oceaniq.region.entity.Region;
import com.oceaniq.region.repository.RegionRepository;
import com.oceaniq.species.entity.Species;
import com.oceaniq.species.repository.SpeciesRepository;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import java.time.LocalDate;

/**
 * service responsible for handling business logic related to datasets
 * handles: 
 * - retrieving datasets with filtering / pagination
 * - creating new datasets
 * - updating dataset status
 * - flagging datasets 
 * - managing dataset interactions (e.g. incrementing download count)
*/
@Service
@RequiredArgsConstructor
public class DatasetService {
    
    // injecting repositories for dataset management and user management
    private final DatasetRepository datasetRepository;
    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final SpeciesRepository speciesRepository;
    
    /**
     * retrieves a paginated list of datasets with optional search, status and category filtering
     * 
     * @param search optional keyword to search datasets by name or uploader name (case-insensitive)
     * @param status optional dataset status to filter by (e.g. VERIFIED, PENDING, FLAGGED)
     * @param category optional category to filter by
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated response of DatasetResponse DTOs matching specified filters
     * 
     * if search keyword is provided, filters datasets by name or uploader name containing the keyword (case-insensitive)
     * if status is provided, filters datasets by specified status
     * if category is provided, filters datasets by specified category
     * if no filters are provided, returns all datasets paginated
     * converts Dataset entities to DatasetResponse DTOs and returns paginated result
    */
    @Transactional(readOnly = true)
    public Page<DatasetResponse> getDatasets(String search, DatasetStatus status,
        String category, Long regionId, Long speciesId, Pageable pageable) {

        String normalizedSearch = (search == null || search.isBlank()) ? null : search.trim();
        String normalizedCategory = (category == null || category.isBlank()) ? null : category.trim();

        Specification<Dataset> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            Join<Dataset, Species> speciesJoin = root.join("species", JoinType.LEFT);

            if (query != null) {
                query.distinct(true);
            }

            if (normalizedSearch != null) {
                String searchPattern = "%" + normalizedSearch.toLowerCase(Locale.ROOT) + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), searchPattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("uploader").get("name")), searchPattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("region").get("name")), searchPattern),
                        criteriaBuilder.like(criteriaBuilder.lower(speciesJoin.get("commonName")), searchPattern)
                ));
            }

            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            if (normalizedCategory != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), normalizedCategory));
            }

            if (regionId != null) {
                predicates.add(criteriaBuilder.equal(root.get("region").get("id"), regionId));
            }

            if (speciesId != null) {
                predicates.add(criteriaBuilder.equal(speciesJoin.get("id"), speciesId));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return datasetRepository.findAll(specification, pageable).map(this::convertToResponse);
    }

    /**
     * retrieves a dataset by its ID
     * @param id the ID of the dataset to retrieve
     * @return the DatasetResponse DTO for the requested dataset
     * @throws ResourceNotFoundException if the dataset with the specified ID is not found
     * 
     * calls datasetRepository.findById to find dataset with specified ID
     * if dataset is not found throws ResourceNotFoundException
     * if dataset is found, converts Dataset entity to DatasetResponse DTO using convertToResponse method
     * 
     */
    public DatasetResponse getDatasetById(Long id) {
        Dataset dataset = datasetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dataset not found"));
        return convertToResponse(dataset);
    }

    /**
     * creates a new dataset with the provided details and uploader information
     * @param request CreateDatasetRequest containing dataset details
     * @param uploaderId ID of the user uploading the dataset
     * @return the created DatasetResponse DTO
     * @throws ResourceNotFoundException if the uploader with the specified ID is not found
     * 
     * calls userRepository.findById to find uploader by ID, throws ResourceNotFoundException if not found
     * creates a new Dataset entity and populates it with details from the request and uploader info
     * saves the new dataset to the database using datasetRepository.save()
     * converts the saved Dataset entity to DatasetResponse DTO using convertToResponse method and returns it
    */
    
    @Transactional
    public DatasetResponse createDataset(CreateDatasetRequest request, Long uploaderId) {

        Region region = regionRepository.findById(request.getRegionId())
        .orElseThrow(() -> new ResourceNotFoundException("Region not found"));

        Set<Species> species = request.getSpeciesIds() == null ? Set.of()
        : new HashSet<>(speciesRepository.findAllById(request.getSpeciesIds()));

        User uploader = userRepository.findById(uploaderId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Dataset dataset = new Dataset();
        dataset.setName(request.getName());
        dataset.setDescription(request.getDescription());
        dataset.setUploader(uploader);
        dataset.setUploadDate(LocalDate.now());
        dataset.setFileSize(request.getFileSize());
        dataset.setFileUrl(request.getFileUrl());
        dataset.setCategory(request.getCategory());
        dataset.setRegion(region);
        dataset.setSpecies(species);
        dataset.setStatus(DatasetStatus.PENDING);
        dataset.setDownloadCount(0);
        
        dataset = datasetRepository.save(dataset);
        return convertToResponse(dataset);
    }
    
    /**
     * updates the status of a dataset (e.g. to VERIFIED, PENDING, FLAGGED)
     * @param id ID of the dataset to update
     * @param status new status to set for the dataset
     * @return the updated DatasetResponse DTO
     * @throws ResourceNotFoundException if the dataset with the specified ID is not found
     * 
     * calls datasetRepository.findById to find dataset by ID, throws ResourceNotFoundException if not found
     * updates  dataset's status with provided value and saves it using datasetRepository.save()
     * converts updated Dataset entity to DatasetResponse DTO using convertToResponse method and returns it
    */
    @Transactional
    public DatasetResponse updateDatasetStatus(Long id, DatasetStatus status) {
        Dataset dataset = datasetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dataset not found"));
        
        dataset.setStatus(status);
        dataset = datasetRepository.save(dataset);
        
        return convertToResponse(dataset);
    }

    /**
     * flags a dataset for moderation (e.g. if it contains inappropriate content)
     * @param id ID of the dataset to flag
     * @param request FlagRequest containing details about the flagging (e.g. reason)
     * @return the updated DatasetResponse DTO after flagging
     * @throws ResourceNotFoundException if the dataset with the specified ID is not found
     * 
     * calls datasetRepository.findById to find dataset by ID, throws ResourceNotFoundException if not found
     * updates dataset's status to FLAGGED and saves it using datasetRepository.save()
     * converts updated Dataset entity to DatasetResponse DTO using convertToResponse method and returns it
    */    
    @Transactional
    public DatasetResponse flagDataset(Long id, FlagRequest request) {
        Dataset dataset = datasetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dataset not found"));
        
        dataset.setStatus(DatasetStatus.FLAGGED);
        dataset = datasetRepository.save(dataset);
                
        return convertToResponse(dataset);
    }

        /**
        * deletes a dataset by its ID
        * @param id ID of the dataset to delete
        * @throws ResourceNotFoundException if the dataset with the specified ID is not found
        * 
        * calls datasetRepository.findById to find dataset by ID, throws ResourceNotFoundException if not found
        * if dataset is found, deletes it using datasetRepository.delete()
        */
    @Transactional
    public void deleteDataset(Long id) {
        Dataset dataset = datasetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dataset not found"));
        
        datasetRepository.delete(dataset);
    }
    
    /**
     * increments the download count for a dataset by its ID
     * @param id ID of the dataset to update
     * @throws ResourceNotFoundException if the dataset with the specified ID is not found
     * 
     * calls datasetRepository.findById to find dataset by ID, throws ResourceNotFoundException if not found
     * if dataset is found, increments its download count by 1 and saves it using datasetRepository.save()
    */
    @Transactional
    public void incrementDownloadCount(Long id) {
        Dataset dataset = datasetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dataset not found"));
        
        dataset.setDownloadCount(dataset.getDownloadCount() + 1);
        datasetRepository.save(dataset);
    }

    // helper method to convert Dataset entity to DatasetResponse DTO
    private DatasetResponse convertToResponse(Dataset dataset) {
        DatasetResponse response = new DatasetResponse();

        response.setId(dataset.getId());
        response.setName(dataset.getName());
        response.setDescription(dataset.getDescription());
        if (dataset.getUploader() != null) {
            response.setUploaderName(dataset.getUploader().getName());
            response.setUploaderId(dataset.getUploader().getId());
        } else {
            response.setUploaderName("Unknown uploader");
        }
        response.setUploadDate(dataset.getUploadDate());
        response.setFileSize(dataset.getFileSize());
        response.setFileUrl(dataset.getFileUrl());
        response.setStatus(dataset.getStatus());
        response.setCategory(dataset.getCategory());
        
        if (dataset.getRegion() != null) {
            response.setRegionId(dataset.getRegion().getId());
            response.setRegionName(dataset.getRegion().getName());
        }

        if (dataset.getSpecies() != null) {
            response.setSpeciesIds(
                dataset.getSpecies().stream().map(Species::getId).collect(Collectors.toSet())
            );
            response.setSpeciesNames(
                dataset.getSpecies().stream().map(Species::getCommonName).collect(Collectors.toSet())
            );
        }

        response.setDownloadCount(dataset.getDownloadCount());
        response.setCreatedAt(dataset.getCreatedAt());
        return response;
    }
}
