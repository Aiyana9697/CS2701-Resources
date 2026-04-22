package com.josh.learnbackend.repository;

import com.josh.learnbackend.model.TimelineEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimelineEventRepository extends JpaRepository<TimelineEvent, Long> {
}