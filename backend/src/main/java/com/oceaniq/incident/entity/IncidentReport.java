package com.oceaniq.incident.entity;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.oceaniq.incident.enums.ReportStatus;
import com.oceaniq.incident.enums.ReportType;
import com.oceaniq.region.entity.Region;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "incident_reports")
@EntityListeners(AuditingEntityListener.class)

public class IncidentReport implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Integer reportId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "contractor_id", nullable = false)
    private Integer contractorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @Enumerated(EnumType.STRING) // uses one of the enum values as reportType which can be financial, etc
    @Column(name = "report_type", nullable = false)
    private ReportType reportType;

    @NotBlank
    @Column(columnDefinition = "VARCHAR(255)")
    private String title;

    @Column(name = "summary_text", columnDefinition = "TEXT")
    private String summaryText;

    @Enumerated(EnumType.STRING) // stored as string using emumerated(EnumType.String)
    @Column(nullable = false)
    private ReportStatus status; // report status can be Draft, Submitted, etc.

    @Column(name = "submitted_at")
    private Date submittedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    public IncidentReport() {
        super();
    }

    public IncidentReport(Integer userId, Integer contractorId, Region region, ReportType reportType,
        String title, String summaryText, ReportStatus status, Date submittedAt) {
    
        this.userId = userId;
        this.contractorId = contractorId;
        this.region = region;
        this.reportType = reportType;
        this.title = title;
        this.summaryText = summaryText;
        this.status = status;
        this.submittedAt = submittedAt;
}

    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getContractorId() {
        return contractorId;
    }

    public void setContractorId(Integer contractorId) {
        this.contractorId = contractorId;
    }

    public Region getRegion() {
    return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummaryText() {
        return summaryText;
    }

    public void setSummaryText(String summaryText) {
        this.summaryText = summaryText;
    }

    public ReportStatus getStatus() {
        return status;
    }

    public void setStatus(ReportStatus status) {
        this.status = status;
    }

    public Date getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Date submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override // overrides with the toString method to print the report details in a readable format
    public String toString() {
        return "Report [reportId=" + reportId + ", userId=" + userId + ", contractorId=" + contractorId
                + ", region=" + region + ", reportType=" + reportType + ", title=" + title
                + ", status=" + status + ", submittedAt=" + submittedAt + ", createdAt=" + createdAt + "]";
    }
}