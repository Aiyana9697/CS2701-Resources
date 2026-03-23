package com.example.demo.Controllers;

import com.example.demo.Models.Report;
import com.example.demo.Repos.ReportRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // tells springboot that this class handles http requests
// and the value returned by the methods converts to JSON and sends it back to
// the client.
public class ReportController {

    private final ReportRepository reportRepository;

    public ReportController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @GetMapping("/report")
    public ResponseEntity<List<Report>> getAll() {
        List<Report> reports = (List<Report>) reportRepository.findAll();
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/report")
    public ResponseEntity<Report> add(@RequestBody Report report) {
        reportRepository.save(report);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    @GetMapping("/report/{id}")
    public ResponseEntity<Report> getById(@PathVariable Integer id) {
        Optional<Report> report = reportRepository.findById(id);
        return report.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!reportRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reportRepository.deleteById(id);
        return ResponseEntity.ok("Report deleted");
    }

    @GetMapping("/report/findByTitle")
    public ResponseEntity<Object> findByTitle(@RequestParam(value = "title", required = false) String title) {
        if (title == null || title.isBlank()) { // searches the report by its title
            return ResponseEntity.badRequest().body("title parameter is required");
        }
        Report report = reportRepository.findByTitle(title);
        if (report == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(report);
    }
}