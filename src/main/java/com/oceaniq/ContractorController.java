package com.example.demo.Controllers;

import com.example.demo.Models.Contractor;
import com.example.demo.Repos.ContractorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ContractorController { // handles http requests for the contractor entity

    private final ContractorRepository contractorRepository;

    public ContractorController(ContractorRepository contractorRepository) {
        this.contractorRepository = contractorRepository;
    }

    @GetMapping("/contractor")
    public ResponseEntity<List<Contractor>> getAll() {
        List<Contractor> contractors = (List<Contractor>) contractorRepository.findAll();
        return ResponseEntity.ok(contractors);
        // returns list of contractors with 200 ok status. 201 created or 404 not found
    }

    @PostMapping("/contractor")
    public ResponseEntity<Contractor> add(@RequestBody Contractor contractor) {
        contractorRepository.save(contractor);
        return ResponseEntity.status(HttpStatus.CREATED).body(contractor);
    }

    @GetMapping("/contractor/{id}")
    public ResponseEntity<Contractor> getById(@PathVariable Integer id) {
        Optional<Contractor> contractor = contractorRepository.findById(id);
        return contractor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/contractor/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!contractorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        contractorRepository.deleteById(id);
        return ResponseEntity.ok("Contractor deleted");
    }

    @GetMapping("/contractor/findByName")
    public ResponseEntity<Object> findByName(@RequestParam(value = "name", required = false) String name) {
        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().body("Name parameter is required");
        }
        Contractor contractor = contractorRepository.findByName(name);
        if (contractor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contractor);
    }
}