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

@RestController
@RequestMapping("/api/v1/modules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ModuleController {
    
    private final ModuleService moduleService;
    
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
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ModuleResponse>> getModuleById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        Long userId = currentUser != null ? currentUser.getId() : null;
        ModuleResponse module = moduleService.getModuleById(id, userId);
        return ResponseEntity.ok(ApiResponse.success(module));
    }
    
    @PostMapping("/progress")
    public ResponseEntity<ApiResponse<Void>> updateProgress(
            @Valid @RequestBody UpdateProgressRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        moduleService.updateProgress(currentUser.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Progress updated successfully", null));
    }
}