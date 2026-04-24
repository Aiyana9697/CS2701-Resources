package com.oceaniq.incident.repository;


import com.oceaniq.incident.entity.IncidentEvidence;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IncidentEvidenceRepository extends CrudRepository<IncidentEvidence, Integer> {
    // spring provides the built in methods without needed to write them down
    @Query("SELECT f FROM IncidentEvidence f WHERE f.fileName = ?1") // JPQL query
    IncidentEvidence findByFileName(String fileName); // the custom query to find file by its name
}