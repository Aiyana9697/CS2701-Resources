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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleService {
    
    private final LearningModuleRepository moduleRepository;
    private final UserModuleProgressRepository progressRepository;
    private final UserRepository userRepository;
    
    public Page<ModuleResponse> getModules(String search, String category, Pageable pageable) {
        Page<LearningModule> modules;
        
        if (search != null && !search.isEmpty()) {
            modules = moduleRepository.searchModules(search, pageable);
        } else if (category != null) {
            modules = moduleRepository.findByCategory(category, pageable);
        } else {
            modules = moduleRepository.findAll(pageable);
        }
        
        return modules.map(this::convertToResponse);
    }
    
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
    
    @Transactional
    public void updateProgress(Long userId, UpdateProgressRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        LearningModule module = moduleRepository.findById(request.getModuleId())
            .orElseThrow(() -> new ResourceNotFoundException("Module not found"));
        
        UserModuleProgress progress = progressRepository
            .findByUserIdAndModuleId(userId, request.getModuleId())
            .orElse(new UserModuleProgress());
        
        progress.setUser(user);
        progress.setModule(module);
        progress.setProgress(request.getProgress());
        progress.setCurrentLesson(request.getCurrentLesson());
        progress.setLastAccessedAt(LocalDateTime.now());
        
        if (progress.getStartedAt() == null) {
            progress.setStartedAt(LocalDateTime.now());
            progress.setStatus(ModuleStatus.IN_PROGRESS);
        }
        
        if (request.getProgress() >= 100) {
            progress.setStatus(ModuleStatus.COMPLETED);
            progress.setCompletedAt(LocalDateTime.now());
        }
        
        progressRepository.save(progress);
    }
    
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