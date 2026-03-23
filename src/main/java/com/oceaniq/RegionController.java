package com.example.demo.Controllers;

import com.example.demo.Models.Region;
import com.example.demo.Repos.RegionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
// follows the same pattern as the contractor controller
@RestController
public class RegionController {

    private final RegionRepository regionRepository;

    public RegionController(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    @GetMapping("/region")
    public ResponseEntity<List<Region>> getAll() {
        List<Region> regions = (List<Region>) regionRepository.findAll();
        return ResponseEntity.ok(regions);
    }

    @PostMapping("/region")
    public ResponseEntity<Region> add(@RequestBody Region region) {
        regionRepository.save(region);
        return ResponseEntity.status(HttpStatus.CREATED).body(region);
    }

    @GetMapping("/region/{id}")
    public ResponseEntity<Region> getById(@PathVariable Integer id) { 
        Optional<Region> region = regionRepository.findById(id);
        return region.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/region/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        if (!regionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        regionRepository.deleteById(id);
        return ResponseEntity.ok("Region deleted");
    }

    @GetMapping("/region/findByRegionName")
    public ResponseEntity<Object> findByRegionName(
            @RequestParam(value = "regionName", required = false) String regionName) {
        if (regionName == null || regionName.isBlank()) {
            return ResponseEntity.badRequest().body("regionName parameter is required");
        }
        Region region = regionRepository.findByRegionName(regionName);
        if (region == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(region);
    }
}