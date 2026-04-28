package com.oceaniq.module.service;

import com.oceaniq.module.dto.request.UpdateProgressRequest;
import com.oceaniq.module.dto.response.ModuleResponse;
import com.oceaniq.module.entity.LearningModule;
import com.oceaniq.user.entity.User;
import com.oceaniq.module.entity.UserModuleProgress;
import com.oceaniq.module.enums.ModuleStatus;
import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.module.repository.LearningModuleRepository;
import com.oceaniq.module.repository.UserModuleProgressRepository;
import com.oceaniq.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * service responsible for handling business logic related to learning modules & user progress
 * handles retrieving modules / module details and updating user progress within module 
*/
@Service
@RequiredArgsConstructor
public class ModuleService {
    
    // injecting repositories for learning modules, user progress and user management
    private final LearningModuleRepository moduleRepository;
    private final UserModuleProgressRepository progressRepository;
    private final UserRepository userRepository;
    
    /**
     * retrieves a paginated list of learning modules with optional search & category filtering
     * 
     * @param search optional keyword to search modules by title / description (case-insensitive)
     * @param category optional category to filter modules by
     * @param pageable pagination info (page number, size, sorting)
     * @return paginated response of ModuleResponse DTOs which include module metadata and user's progress info (if userId is provided)
     * 
     * if search keyword is provided, filters modules by title or description containing the keyword (case-insensitive)
     * if category is provided, filters modules by category
     * if no filters are provided, returns all modules paginated
     * converts LearningModule entities to ModuleResponse DTOs and returns paginated result
     * 
     */
    @Transactional(readOnly = true)
    public Page<ModuleResponse> getModules(String search, String category, Pageable pageable) {

        Specification<LearningModule> specification = buildModuleSpecification(search, category);
        return moduleRepository.findAll(specification, pageable).map(this::convertToResponse);
    }

    private Specification<LearningModule> buildModuleSpecification(String search, String category) {
        String normalizedSearch = (search == null || search.isBlank()) ? null : search.trim().toLowerCase();
        String normalizedCategory = (category == null || category.isBlank()) ? null : category.trim().toLowerCase();

        return (root, query, criteriaBuilder) -> {
            var predicate = criteriaBuilder.conjunction();

            if (normalizedSearch != null) {
                String pattern = "%" + normalizedSearch + "%";
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.or(
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), pattern),
                                criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), pattern)
                        )
                );
            }

            if (normalizedCategory != null) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(criteriaBuilder.lower(root.get("category")), normalizedCategory)
                );
            }

            return predicate;
        };
    }
    
    /**
     * retrieves a module by its ID, including user's progress if userId is provided
     * 
     * @param id ID of module to retrieve
     * @param userId optional user ID to retrieve progress for (can be null for unauthenticated users)
     * @return ModuleResponse DTO containing module metadata and user's progress info (if userId is provided)
     * 
     * fetches module entity from database by ID, throws ResourceNotFoundException if not found
     * converts module entity to ModuleResponse DTO
     * if a user Id is provided, retrieves user's progress for module
     * if progress exists, sets progress percentage and status in the response DTO
     * returns module response (with or without progress)
    */
    public ModuleResponse getModuleById(Long id, Long userId) {
        LearningModule module = moduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Module not found"));
        
        ModuleResponse response = convertToResponse(module);
        
        if (userId != null) {
            progressRepository.findByUserIdAndModuleId(userId, id)
                .ifPresent(progress -> {
                    response.setProgress(progress.getProgress());
                    response.setStatus(progress.getStatus().name());
                });
        }
        
        return response;
    }
    
    /**
     * updates user's progress for a module based on the provided UpdateProgressRequest
     * @param userId ID of the user whose progress is being updated
     * @param request DTO containing module ID, progress percentage, and current lesson
    */
    @Transactional
    public void updateProgress(Long userId, UpdateProgressRequest request) {

        // fetches user from database by ID, throws ResourceNotFoundException if user not found
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        // fetches module from database by ID, throws ResourceNotFoundException if module not found
        LearningModule module = moduleRepository.findById(request.getModuleId())
            .orElseThrow(() -> new ResourceNotFoundException("Module not found"));
        
        /**
         * try to find existing progress record for this user + module
         * if not found, create a new empty progress object
         */
        UserModuleProgress progress = progressRepository
            .findByUserIdAndModuleId(userId, request.getModuleId())
            .orElse(new UserModuleProgress());
        
        // update progress fields based on request data (user, module, progress percentage etc..)
        progress.setUser(user);
        progress.setModule(module);
        progress.setProgress(request.getProgress());
        progress.setCurrentLesson(request.getCurrentLesson());
        progress.setLastAccessedAt(LocalDateTime.now());
        
        // if progress is being updated for the first time (startedAt is null), set startedAt timestamp and update status to IN_PROGRESS
        if (progress.getStartedAt() == null) {
            progress.setStartedAt(LocalDateTime.now());
            progress.setStatus(ModuleStatus.IN_PROGRESS);
        }
        
        // if progress percentage is 100 or more, mark module as COMPLETED and set completedAt timestamp
        if (request.getProgress() >= 100) {
            progress.setStatus(ModuleStatus.COMPLETED);
            progress.setCompletedAt(LocalDateTime.now());
        }
        
        // saves progress record to database (insert if new, update if existing)
        progressRepository.save(progress);
    }
    
    // helper method to convert LearningModule entity to ModuleResponse DTO
    private ModuleResponse convertToResponse(LearningModule module) {
        ModuleResponse response = new ModuleResponse();
        response.setId(module.getId());
        response.setTitle(module.getTitle());
        response.setDescription(module.getDescription());
        response.setIcon(module.getIcon());
        response.setLessonsCount(module.getLessonsCount());
        response.setDuration(module.getDuration());
        response.setCategory(module.getCategory());
        response.setDifficultyLevel(module.getDifficultyLevel());
        response.setProgress(0);
        response.setStatus("NOT_STARTED");
        
        /**converts list of lesson entities to list of LessonResponse DTOs and sets in module response
         * maps each lesson in module.getLessons() to a new LessonResponse DTO, extracting relevant fields (id, title, content, order index, duration, type, resource URL)
         * collects the mapped LessonResponse DTOs into a list and sets it in the module response
         * returns the fully built ModuleResponse DTO with module metadata and list of lessons (without user progress info, which is set separately if userId is provided)
        */
        List<ModuleResponse.LessonResponse> lessons = module.getLessons().stream()
            .map(lesson -> new ModuleResponse.LessonResponse(
                lesson.getId(),
                lesson.getTitle(),
                lesson.getContent(),
                lesson.getOrderIndex(),
                lesson.getDuration(),
                lesson.getType().name(),
                lesson.getResourceUrl()
            ))
            .collect(Collectors.toList());
        response.setLessons(lessons);
        
        return response;
    }
}
