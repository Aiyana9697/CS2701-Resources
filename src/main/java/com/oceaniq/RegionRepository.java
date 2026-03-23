package com.example.demo.Repos;

import com.example.demo.Models.Region;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RegionRepository extends CrudRepository<Region, Integer> { // extends with these parameters
    @Query("SELECT r FROM Region r WHERE r.regionName = ?1")
    Region findByRegionName(String regionName); // custom query method to find a region by its name
}
