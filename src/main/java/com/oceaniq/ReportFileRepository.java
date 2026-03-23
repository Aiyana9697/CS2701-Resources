package com.example.demo.Repos;

import com.example.demo.Models.ReportFile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ReportFileRepository extends CrudRepository<ReportFile, Integer> {
    // spring provides the built in methods without needed to write them down
    @Query("SELECT f FROM ReportFile f WHERE f.fileName = ?1") // JPQL query
    ReportFile findByFileName(String fileName); // the custom query to find file by its name
}
