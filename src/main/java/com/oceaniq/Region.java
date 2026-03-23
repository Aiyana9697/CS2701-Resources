package com.example.demo.Models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity // maps to the region entity
@Table(name = "regions")
public class Region implements Serializable {
    private static final long serialVersionUID = 1L;
    // doesn't use auditing fields since they are fairly static reference data that
    // don't need timestamps
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private Integer regionId;

    @NotBlank
    @Column(name = "region_name", columnDefinition = "VARCHAR(255)")
    private String regionName;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Region() {
        super();
    }

    public Region(String regionName, String description) {
        this.regionName = regionName;
        this.description = description;
    }

    public Integer getRegionId() {
        return regionId;
    }

    public void setRegionId(Integer regionId) {
        this.regionId = regionId;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Region [regionId=" + regionId + ", regionName=" + regionName
                + ", description=" + description + "]";
    }
}
