package com.coursecontentsystem.dto;

import com.coursecontentsystem.model.ContentStatus;
import com.coursecontentsystem.model.FileType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContentDTO {
    private Long id;
    private LocalDateTime createdAt;
    private Long version;
    private String title;
    private String description;
    private String filePath;
    private String originalFilename;
    private FileType fileType;
    private Long fileSize;
    private String contentType;
    private Long courseId;
    private String courseName;
    private Long uploadedById;
    private String uploadedByName;
    private ContentStatus status;
    private Integer displayOrder;
    private String contentUrl;
}
