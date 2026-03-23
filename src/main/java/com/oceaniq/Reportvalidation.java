package com.example.demo.Models;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reports_validations") // stores the result of validating a report with checks/rules
public class Reportvalidation implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "validation_id")
    private Integer validationId;

    @Column(name = "report_id", nullable = false) // foreign key to the report being validated
    private Integer reportId;

    @Column(name = "rule_code", columnDefinition = "VARCHAR(255)")
    // stores the name of the validation rule that was applied
    private String ruleCode;

    @Enumerated(EnumType.STRING) // store result of validation using string
    @Column(nullable = false)
    private ValidationResult result;

    @Column(columnDefinition = "TEXT")
    private String message; // message explaining the result

    @Column(name = "validated_at")
    private Date validatedAt; // when it was validated

    public Reportvalidation() {
        super();
    }

    public Reportvalidation(Integer reportId, String ruleCode, ValidationResult result,
            String message, Date validatedAt) {
        this.reportId = reportId;
        this.ruleCode = ruleCode;
        this.result = result;
        this.message = message;
        this.validatedAt = validatedAt;
    }

    public Integer getValidationId() {
        return validationId;
    }

    public void setValidationId(Integer validationId) {
        this.validationId = validationId;
    }

    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public String getRuleCode() {
        return ruleCode;
    }

    public void setRuleCode(String ruleCode) {
        this.ruleCode = ruleCode;
    }

    public ValidationResult getResult() {
        return result;
    }

    public void setResult(ValidationResult result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getValidatedAt() {
        return validatedAt;
    }

    public void setValidatedAt(Date validatedAt) {
        this.validatedAt = validatedAt;
    }

    @Override
    public String toString() {
        return "ReportValidation [validationId=" + validationId + ", reportId=" + reportId
                + ", ruleCode=" + ruleCode + ", result=" + result
                + ", message=" + message + ", validatedAt=" + validatedAt + "]";
    }
}