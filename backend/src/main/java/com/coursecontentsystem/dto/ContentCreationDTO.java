package com.coursecontentsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContentCreationDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    private Integer displayOrder;

    // The actual file data will be handled separately through multipart/form-data
    // and will not be part of this DTO directly
}