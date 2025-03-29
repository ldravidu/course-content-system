package com.coursecontentsystem.model;

public enum CourseStatus {
    DRAFT, // Course is being created, not visible to students
    PUBLISHED, // Course is active and visible to students
    ARCHIVED // Course is no longer active but preserved for reference
}
