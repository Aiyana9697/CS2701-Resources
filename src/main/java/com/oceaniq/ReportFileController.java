package com.example.demo.Controllers;

import com.example.demo.Models.ReportFile;
import com.example.demo.Repos.ReportFileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ReportFileController {

    private final ReportFileRepository reportFileRepository;

    public ReportFileController(ReportFileRepository reportFileRepository) {
        this.reportFileRepository = reportFileRepository;
    }

    @GetMapping("/reportfile")
    public ResponseEntity<List<ReportFile>> getAll() {
        List<ReportFile> files = (List<ReportFile>) reportFileRepository.findAll();
        return ResponseEntity.ok(files);
    }

    @PostMapping("/reportfile")
    public ResponseEntity<ReportFile> add(@RequestBody ReportFile reportFile) {
        reportFileRepository.save(reportFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(reportFile);
    }

    @GetMapping("/reportfile/{id}")
    public ResponseEntity<ReportFile> getById(@PathVariable Integer id) {
        Optional<ReportFile> file = reportFileRepository.findById(id);
        return file.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/reportfile/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!reportFileRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reportFileRepository.deleteById(id);
        return ResponseEntity.ok("Report file deleted");
    }

    @GetMapping("/reportfile/findByFileName")
    public ResponseEntity<Object> findByFileName(@RequestParam(value = "fileName", required = false) String fileName) {
        // validate that filename is provided and not blank
        if (fileName == null || fileName.isBlank()) {
            return ResponseEntity.badRequest().body("fileName parameter is required");
        }
        ReportFile file = reportFileRepository.findByFileName(fileName);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(file);
    }
}