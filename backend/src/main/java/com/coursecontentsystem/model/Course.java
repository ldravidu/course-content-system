package com.coursecontentsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a course in the system.
 * A course has one instructor, multiple enrolled students, and contains
 * multiple content items.
 */
@Entity
@Table(name = "courses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Course extends BaseEntity {
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @Size(max = 20)
    @Column(length = 20)
    private String courseCode;

    // The instructor who teaches this course
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "instructor_id")
    private User instructor;

    // Enrolled students in this course (many-to-many relationship)
    @ManyToMany(mappedBy = "enrolledCourses")
    private Set<User> enrolledStudents = new HashSet<>();

    // Content items associated with this course (one-to-many relationship)
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Content> contentItems = new HashSet<>();

    // Current status of the course
    @Enumerated(EnumType.STRING)
    private CourseStatus status = CourseStatus.DRAFT;

    // Helper method to add a content item to this course
    public void addContent(Content content) {
        contentItems.add(content);
        content.setCourse(this);
    }

    // Helper method to remove a content item from this course
    public void removeContent(Content content) {
        contentItems.remove(content);
        content.setCourse(null);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + getId() +
                ", title='" + title + '\'' +
                ", courseCode='" + courseCode + '\'' +
                ", status=" + status +
                '}';
    }
}
