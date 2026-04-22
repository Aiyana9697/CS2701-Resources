package com.josh.learnbackend.controller;

import com.josh.learnbackend.model.TimelineEvent;
import com.josh.learnbackend.repository.TimelineEventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/learn")
@CrossOrigin(origins = "*")
public class LearnController {

    private final TimelineEventRepository repository;

    public LearnController(TimelineEventRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/timeline")
    public List<TimelineEvent> getTimelineEvents() {
        return repository.findAll();
    }

    @PostMapping("/timeline")
    public TimelineEvent createTimelineEvent(@RequestBody TimelineEvent timelineEvent) {
        return repository.save(Objects.requireNonNull(timelineEvent));
    }

    @PutMapping("/timeline/{id}")
    public TimelineEvent updateTimelineEvent(@PathVariable Long id, @RequestBody TimelineEvent updatedEvent) {
        Long safeId = Objects.requireNonNull(id);
        TimelineEvent safeUpdatedEvent = Objects.requireNonNull(updatedEvent);

        return repository.findById(safeId)
                .map(event -> {
                    event.setYear(safeUpdatedEvent.getYear());
                    event.setTitle(safeUpdatedEvent.getTitle());
                    event.setDescription(safeUpdatedEvent.getDescription());
                    event.setExtendedDetails(safeUpdatedEvent.getExtendedDetails());
                    event.setImpact(safeUpdatedEvent.getImpact());
                    return repository.save(event);
                })
                .orElseThrow(() -> new RuntimeException("Timeline event not found with id: " + safeId));
    }

    @DeleteMapping("/timeline/{id}")
    public void deleteTimelineEvent(@PathVariable Long id) {
        Long safeId = Objects.requireNonNull(id);

        if (!repository.existsById(safeId)) {
            throw new RuntimeException("Timeline event not found with id: " + safeId);
        }

        repository.deleteById(safeId);
    }
}