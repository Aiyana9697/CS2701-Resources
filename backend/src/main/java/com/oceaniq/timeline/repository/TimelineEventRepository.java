package com.oceaniq.timeline.repository;


import com.oceaniq.timeline.entity.TimelineEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimelineEventRepository extends JpaRepository<TimelineEvent, Long> {
}
