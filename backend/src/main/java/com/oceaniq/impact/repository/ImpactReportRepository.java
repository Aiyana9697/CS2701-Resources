package com.oceaniq.impact.repository;

import com.oceaniq.impact.entity.ImpactReport;
import com.oceaniq.impact.enums.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for managing ImpactReport entitie
 * Provides methods for:
 * - searching reports by title
 * - filtering reports based on impact level and report type
 */
public interface ImpactReportRepository extends JpaRepository<ImpactReport, Long> {

    /**
     * Search impact reports by title (case-insensitive)
     * 
     * @param title    search keyword contained in report title
     * @param pageable pagination configuration
     * @return paginated list of matching impact reports
     */
    Page<ImpactReport> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    /**
     * Retrieve impact reports filtered by impact level
     * 
     * @param impact   impact classification (GREEN, YELLOW, RED)
     * @param pageable pagination configuration
     * @return paginated list of reports with given impact level
     */
    Page<ImpactReport> findByImpact(ImpactLevel impact, Pageable pageable);

    /**
     * Retrieve impact reports filtered by report type
     * 
     * @param type     type of report (EIA, REMP, APEI)
     * @param pageable pagination configuration
     * @return paginated list of reports matching the given type
     */
    Page<ImpactReport> findByReportType(ReportType type, Pageable pageable);

}
