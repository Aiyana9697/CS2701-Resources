package main.java.com.oceaniq.incident.Service;

import com.oceaniq.incident.entity.IncidentReport;

@Service
public class ImpactAssessmentService {

    public String calculateImpactLevel(IncidentReport report) {

        if (report.getReportType().name().equals("EIA")) {
            return "HIGH";
        } else if (report.getReportType().name().equals("REMP")) {
            return "MEDIUM";
        } else {
            return "LOW";
        }
    }

    /**
     * Calculates the environmental impact level of a report
     *
     * Uses simple rule-based logic based on report type:
     * - EIA → HIGH impact (large environmental effect)
     * - REMP → MEDIUM impact (regional management plans)
     * - APEI → LOW impact (protected areas)
     *
     * @param report the incident report to evaluate
     * @return impact level as a string (HIGH, MEDIUM, LOW)
     */

    public String evaluateCompliance(IncidentReport report) {

        if (report.getStatus().name().equals("APPROVED")) {
            return "COMPLIANT";
        } else {
            return "NON-COMPLIANT";
        }
    }

    /**
     * Evaluates whether a report complies with regulatory standards
     *
     * Rule:
     * - APPROVED reports are considered COMPLIANT
     * - All other statuses are NON-COMPLIANT
     *
     * @param report the incident report to evaluate
     * @return compliance status (COMPLIANT or NON-COMPLIANT)
     */
}
