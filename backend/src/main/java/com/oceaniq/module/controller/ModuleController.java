package com.oceaniq.module.controller;

import com.oceaniq.module.dto.request.UpdateProgressRequest;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.module.dto.response.ModuleResponse;
import com.oceaniq.infrastructure.shared.dto.response.PaginatedResponse;
import com.oceaniq.infrastructure.security.UserPrincipal;
import com.oceaniq.module.service.ModuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * controller responsible for mangaging learning modules 
 * provides endpoints for: 
 * - retrieving modules with optional filtering / sorting / pagination 
 * - retrieving a specific module by ID (including user's progress if authenticated)
 * - updating user's progress for a module (progress percentage, current lesson etc..)
*/
@RestController
@RequestMapping("/api/v1/modules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ModuleController {
    
    // injecting ModuleService to handle business logic related to modules and user progress
    private final ModuleService moduleService;
    
    /**
     * Retrieves paginated list of learning modules with optional search & category filtering
     *
     * @param search optional keyword to search modules by title / description (case-insensitive)
     * @param category optional category to filter modules by
     * @param page page number (default: 0)
     * @param size number of items per page (default: 20)
     * @param sortBy field to sort by (default: createdAt)
     * @param sortOrder sort order (default: DESC)
     * @return paginated response of ModuleResponse DTOs
     * 
     * tenerary operator used to create Sort object
     * if sortOrder is "ASC", list is sorted ascending by sortBy field, 
     * if sortOrder is not "ASC" ("DESC"), list is sorted descending by sortBy field
     * 
     * creates a Pageable object containing pagination info (page number, size, sort info) 
     * calls moduleService.getModules() to retrieve paginated list of modules based on filters and pagination info
     * converts the Page<ModuleResponse> returned by service into a PaginatedResponse<ModuleResponse>
     * returns a successful (HTTP 200 OK) response with a list of modules wrapped inside a ApiResponse object, which is serialized to JSON and returned
     */

    @GetMapping
    public ResponseEntity<ApiResponse<PaginatedResponse<ModuleResponse>>> getModules(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder) {
        
        Sort sort = sortOrder.equalsIgnoreCase("ASC") 
            ? Sort.by(sortBy).ascending() 
            : Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ModuleResponse> modules = moduleService.getModules(search, category, pageable);
        
        PaginatedResponse<ModuleResponse> response = new PaginatedResponse<>(
            modules.getContent(),
            modules.getNumber(),
            modules.getTotalPages(),
            modules.getTotalElements(),
            modules.getSize()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * Retrieves a specific module by ID, including user's progress if authenticated
     * @param id ID of module to retrieve
     * @param currentUser authenticated user (can be null for unauthenticated users)
     * @return ModuleResponse DTO containing module metadata and user's progress info (if authenticated)
     * 
     * if user is authenticated, retrieves user's ID from UserPrincipal 
     * ID is passed to moduleService.getModuleById to retrieve module details + user's progress for module
     * returns a successful (HTTP 200 OK) response with module details wrapped inside a ApiResponse object, which is serialized to JSON and returned to the client
    */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ModuleResponse>> getModuleById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser != null ? currentUser.getId() : null;
        ModuleResponse module = moduleService.getModuleById(id, userId);
        return ResponseEntity.ok(ApiResponse.success(module));
    }
    
    /**
     * Updates the user's progress for a specific module
     * @param request UpdateProgressRequest containing progress data
     * @param currentUser authenticated user
     * @return ApiResponse indicating success or failure of the operation
     * 
     * updates user's progress for a module based on the provided UpdateProgressRequest, i
     * including module ID, progress percentage, current lesson ID (optional)
     * calls moduleService.updateProgress with the authenticated user's ID + progress update request to update the user's progress for module
     * if update is successful, a successful (HTTP 200 OK) response is returned with a message indicating progress was updated successfully
     */
    @PostMapping("/progress")
    public ResponseEntity<ApiResponse<Void>> updateProgress(
            @Valid @RequestBody UpdateProgressRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        moduleService.updateProgress(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Progress updated successfully", null));
    }
}