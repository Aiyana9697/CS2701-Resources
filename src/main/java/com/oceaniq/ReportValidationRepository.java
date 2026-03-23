package com.example.demo.Repos;

import com.example.demo.Models.Reportvalidation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ReportValidationRepository extends CrudRepository<Reportvalidation, Integer> {
    @Query("SELECT v FROM Reportvalidation v WHERE v.ruleCode = ?1")
    Reportvalidation findByRuleCode(String ruleCode); // searched validations by rule code
}
