package com.example.demo.Models;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "report_files") // stores data about files attached to reports
public class ReportFile implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Integer fileId;

    @Column(name = "report_id", nullable = false) // linking it to the reports table
    private Integer reportId;

    @NotBlank
    @Column(name = "file_name", columnDefinition = "VARCHAR(255)")
    private String fileName;

    @Column(name = "file_url", columnDefinition = "TEXT") // URL or path to the stored file
    private String fileUrl;

    @Column(name = "mime_type", columnDefinition = "VARCHAR(255)") // file format of file
    private String mimeType;

    @Column(name = "file_size") // in bytes
    private Integer fileSize;

    @Column(columnDefinition = "VARCHAR(255)")
    private String checksum; // verifying file integrity

    @Column(name = "uploaded_at")
    private Date uploadedAt;

    public ReportFile() {
        super(); // default constructor for JPA
    }

    public ReportFile(Integer reportId, String fileName, String fileUrl,
            String mimeType, Integer fileSize, String checksum, Date uploadedAt) {
        this.reportId = reportId;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.mimeType = mimeType;
        this.fileSize = fileSize;
        this.checksum = checksum;
        this.uploadedAt = uploadedAt;
    }

    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Integer getFileSize() {
        return fileSize;
    }

    public void setFileSize(Integer fileSize) {
        this.fileSize = fileSize;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public Date getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(Date uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    @Override
    public String toString() {
        return "ReportFile [fileId=" + fileId + ", reportId=" + reportId + ", fileName=" + fileName
                + ", fileUrl=" + fileUrl + ", mimeType=" + mimeType + ", fileSize=" + fileSize
                + ", checksum=" + checksum + ", uploadedAt=" + uploadedAt + "]";
    }
}
