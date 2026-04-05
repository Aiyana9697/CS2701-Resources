package com.oceaniq.incident.controller;


import com.oceaniq.incident.entity.IncidentReport;
import com.oceaniq.incident.repository.IncidentReportRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // tells springboot that this class handles http requests
// and the value returned by the methods converts to JSON and sends it back to
// the client.
public class IncidentReportController {

    private final IncidentReportRepository incidentReportRepository;

    public IncidentReportController(IncidentReportRepository incidentReportRepository) {
        this.incidentReportRepository = incidentReportRepository;
    }

    @GetMapping("/report")
    public ResponseEntity<List<IncidentReport>> getAll() {
        List<IncidentReport> reports = (List<IncidentReport>) incidentReportRepository.findAll();
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/report")
    public ResponseEntity<IncidentReport> add(@RequestBody IncidentReport report) {
        incidentReportRepository.save(report);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    @GetMapping("/report/{id}")
    public ResponseEntity<IncidentReport> getById(@PathVariable Integer id) {
        Optional<IncidentReport> report = incidentReportRepository.findById(id);
        return report.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!incidentReportRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        incidentReportRepository.deleteById(id);
        return ResponseEntity.ok("Report deleted");
    }

    @GetMapping("/report/findByTitle")
    public ResponseEntity<Object> findByTitle(@RequestParam(value = "title", required = false) String title) {
        if (title == null || title.isBlank()) { // searches the report by its title
            return ResponseEntity.badRequest().body("title parameter is required");
        }
        IncidentReport report = incidentReportRepository.findByTitle(title);
        if (report == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(report);
    }
}