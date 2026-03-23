package com.example.demo.Repos;

import com.example.demo.Models.Contractor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ContractorRepository extends CrudRepository<Contractor, Integer> {
    // extends to give us basic CRUD operations
    // integer is parameter as contractor has an integer id
    @Query("SELECT c FROM Contractor c WHERE c.name = ?1")
    Contractor findByName(String name);// lets me search for a contractor by their organisation name
}