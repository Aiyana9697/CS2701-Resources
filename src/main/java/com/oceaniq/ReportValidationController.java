package com.example.demo.Controllers;

import com.example.demo.Models.Reportvalidation;
import com.example.demo.Repos.ReportValidationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ReportValidationController {

    private final ReportValidationRepository reportValidationRepository;

    public ReportValidationController(ReportValidationRepository reportValidationRepository) {
        this.reportValidationRepository = reportValidationRepository;
    }

    @GetMapping("/reportvalidation")
    public ResponseEntity<List<Reportvalidation>> getAll() {
        List<Reportvalidation> validations = (List<Reportvalidation>) reportValidationRepository.findAll();
        return ResponseEntity.ok(validations);
    }

    @PostMapping("/reportvalidation")
    public ResponseEntity<Reportvalidation> add(@RequestBody Reportvalidation validation) {
        reportValidationRepository.save(validation);
        return ResponseEntity.status(HttpStatus.CREATED).body(validation);
    }

    @GetMapping("/reportvalidation/{id}")
    public ResponseEntity<Reportvalidation> getById(@PathVariable Integer id) {
        Optional<Reportvalidation> validation = reportValidationRepository.findById(id);
        return validation.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/reportvalidation/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!reportValidationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reportValidationRepository.deleteById(id);
        return ResponseEntity.ok("Validation deleted");
    }

    @GetMapping("/reportvalidation/findByRuleCode")
    public ResponseEntity<Object> findByRuleCode(@RequestParam(value = "ruleCode", required = false) String ruleCode) {
        // searched a report validation by rule code
        if (ruleCode == null || ruleCode.isBlank()) {
            return ResponseEntity.badRequest().body("ruleCode parameter is required");
        }
        Reportvalidation validation = reportValidationRepository.findByRuleCode(ruleCode);
        if (validation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(validation);
    }
}