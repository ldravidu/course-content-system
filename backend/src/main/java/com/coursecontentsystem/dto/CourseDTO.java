package com.coursecontentsystem.dto;

import com.coursecontentsystem.model.CourseStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CourseDTO extends BaseDTO {
    private String title;
    private String description;
    private String courseCode;
    private Long instructorId;
    private String instructorName;
    private CourseStatus status;
    private int enrolledStudentsCount;
    private int contentItemsCount;
}
