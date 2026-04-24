package com.oceaniq.timeline.controller;

import com.oceaniq.infrastructure.exception.ResourceNotFoundException;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.timeline.entity.TimelineEvent;
import com.oceaniq.timeline.repository.TimelineEventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/learn")
@CrossOrigin(origins = "http://localhost:5173")
public class TimelineEventController {

    private final TimelineEventRepository repository;

    public TimelineEventController(TimelineEventRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/timeline")
    public ResponseEntity<ApiResponse<List<TimelineEvent>>> getTimelineEvents() {
        return ResponseEntity.ok(ApiResponse.success(repository.findAll()));
    }

    @PostMapping("/timeline")
    public ResponseEntity<ApiResponse<TimelineEvent>> createTimelineEvent(@RequestBody TimelineEvent timelineEvent) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Timeline event created successfully", repository.save(Objects.requireNonNull(timelineEvent))));
    }

    @PutMapping("/timeline/{id}")
    public ResponseEntity<ApiResponse<TimelineEvent>> updateTimelineEvent(@PathVariable Long id, @RequestBody TimelineEvent updatedEvent) {
        Long safeId = Objects.requireNonNull(id);
        TimelineEvent safeUpdatedEvent = Objects.requireNonNull(updatedEvent);

        TimelineEvent event = repository.findById(safeId)
                .map(existingEvent -> {
                    existingEvent.setYear(safeUpdatedEvent.getYear());
                    existingEvent.setTitle(safeUpdatedEvent.getTitle());
                    existingEvent.setDescription(safeUpdatedEvent.getDescription());
                    existingEvent.setExtendedDetails(safeUpdatedEvent.getExtendedDetails());
                    existingEvent.setImpact(safeUpdatedEvent.getImpact());
                    return repository.save(existingEvent);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Timeline event not found with id: " + safeId));

        return ResponseEntity.ok(ApiResponse.success("Timeline event updated successfully", event));
    }

    @DeleteMapping("/timeline/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTimelineEvent(@PathVariable Long id) {
        Long safeId = Objects.requireNonNull(id);

        if (!repository.existsById(safeId)) {
            throw new ResourceNotFoundException("Timeline event not found with id: " + safeId);
        }

        repository.deleteById(safeId);
        return ResponseEntity.ok(ApiResponse.success("Timeline event deleted successfully", null));
    }
}
