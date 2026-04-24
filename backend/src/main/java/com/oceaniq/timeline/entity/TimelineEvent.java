package com.oceaniq.timeline.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TimelineEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_year")
    private String year;

    private String title;
    private String description;
    private String extendedDetails;
    private String impact;

    public TimelineEvent() {
    }

    public TimelineEvent(String year, String title, String description, String extendedDetails, String impact) {
        this.year = year;
        this.title = title;
        this.description = description;
        this.extendedDetails = extendedDetails;
        this.impact = impact;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExtendedDetails() {
        return extendedDetails;
    }

    public void setExtendedDetails(String extendedDetails) {
        this.extendedDetails = extendedDetails;
    }

    public String getImpact() {
        return impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }
}