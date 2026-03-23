package com.example.demo.Repos;

import com.example.demo.Models.Report;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ReportRepository extends CrudRepository<Report, Integer> {
    @Query("SELECT r FROM Report r WHERE r.title = ?1") // reports searched by their title
    Report findByTitle(String title);
}