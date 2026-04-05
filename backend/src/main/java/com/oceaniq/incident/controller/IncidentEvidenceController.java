package com.oceaniq.incident.controller;

import com.oceaniq.incident.entity.IncidentEvidence;
import com.oceaniq.incident.repository.IncidentEvidenceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class IncidentEvidenceController {

    private final IncidentEvidenceRepository incidentEvidenceRepository;

    public IncidentEvidenceController(IncidentEvidenceRepository incidentEvidenceRepository) {
        this.incidentEvidenceRepository = incidentEvidenceRepository;
    }

    @GetMapping("/reportfile")
    public ResponseEntity<List<IncidentEvidence>> getAll() {
        List<IncidentEvidence> files = (List<IncidentEvidence>) incidentEvidenceRepository.findAll();
        return ResponseEntity.ok(files);
    }

    @PostMapping("/reportfile")
    public ResponseEntity<IncidentEvidence> add(@RequestBody IncidentEvidence incidentEvidence) {
        incidentEvidenceRepository.save(incidentEvidence);
        return ResponseEntity.status(HttpStatus.CREATED).body(incidentEvidence);
    }

    @GetMapping("/reportfile/{id}")
    public ResponseEntity<IncidentEvidence> getById(@PathVariable Integer id) {
        Optional<IncidentEvidence> file = incidentEvidenceRepository.findById(id);
        return file.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/reportfile/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!incidentEvidenceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        incidentEvidenceRepository.deleteById(id);
        return ResponseEntity.ok("Report file deleted");
    }

    @GetMapping("/reportfile/findByFileName")
    public ResponseEntity<Object> findByFileName(@RequestParam(value = "fileName", required = false) String fileName) {
        // validate that filename is provided and not blank
        if (fileName == null || fileName.isBlank()) {
            return ResponseEntity.badRequest().body("fileName parameter is required");
        }
        IncidentEvidence file = incidentEvidenceRepository.findByFileName(fileName);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(file);
    }
}