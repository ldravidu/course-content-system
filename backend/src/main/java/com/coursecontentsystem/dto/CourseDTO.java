package com.coursecontentsystem.dto;

import com.coursecontentsystem.model.CourseStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CourseDTO {
    private Long id;
    private LocalDateTime createdAt;
    private Long version;
    private String title;
    private String description;
    private String courseCode;
    private Long instructorId;
    private String instructorName;
    private CourseStatus status;
    private int enrolledStudentsCount;
    private int contentItemsCount;
}
