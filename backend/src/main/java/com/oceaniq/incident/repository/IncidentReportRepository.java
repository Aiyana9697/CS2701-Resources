package com.oceaniq.incident.repository;

import com.oceaniq.incident.entity.IncidentReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IncidentReportRepository extends CrudRepository<IncidentReport, Integer> {
    // spring provides the built in methods without needed to write them down
    @Query("SELECT f FROM IncidentReport f WHERE f.title = ?1") // JPQL query
    IncidentReport findByTitle(String title); // the custom query to find report by its title
}

