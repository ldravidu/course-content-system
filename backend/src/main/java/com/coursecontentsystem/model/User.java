package com.coursecontentsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a user in the system.
 * Users can have different roles (instructor or student) and can be associated
 * with multiple courses.
 */
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "username")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    @NotBlank
    @Size(max = 50)
    @Column(nullable = false)
    private String username;

    @NotBlank
    @Size(max = 100)
    @Email
    @Column(nullable = false)
    private String email;

    // TODO: ensure that passwords are properly hashed and salted before storing
    // them in the database.
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String password;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Bidirectional relationship with Course (Instructor relation)
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private Set<Course> instructCourses = new HashSet<>();

    // Many-to-many relationship with Course (enrolled Student relation)
    @ManyToMany
    @JoinTable(name = "course_enrollments", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> enrolledCourses = new HashSet<>();

    // One-to-many relationship with Content (files uploaded by this user)
    @OneToMany(mappedBy = "uploadedBy", cascade = CascadeType.ALL)
    private Set<Content> uploadedContents = new HashSet<>();

    // User role enum
    public enum Role {
        ROLE_STUDENT,
        ROLE_INSTRUCTOR,
        ROLE_ADMIN
    }

    // Helper method to add a course that this user instructs
    public void addInstructCourse(Course course) {
        instructCourses.add(course);
        course.setInstructor(this);
    }

    // Helper method to remove a course that this user instructs
    public void removeInstructCourse(Course course) {
        instructCourses.remove(course);
        course.setInstructor(null);
    }

    // Helper method to enroll in a course
    public void enrollInCourse(Course course) {
        enrolledCourses.add(course);
        course.getEnrolledStudents().add(this);
    }

    // Helper method to unenroll from a course
    public void unenrollFromCourse(Course course) {
        enrolledCourses.remove(course);
        course.getEnrolledStudents().remove(this);
    }

    // Helper method to add uploaded content
    public void addUploadedContent(Content content) {
        uploadedContents.add(content);
        content.setUploadedBy(this);
    }

    // Helper method to remove uploaded content
    public void removeUploadedContent(Content content) {
        uploadedContents.remove(content);
        content.setUploadedBy(null);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + getId() +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role=" + role +
                '}';
    }
}
