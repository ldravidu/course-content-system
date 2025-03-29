package com.coursecontentsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity representing a piece of content (file) in the system.
 * Content is associated with a course and has metadata about the file.
 */
@Entity
@Table(name = "content")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Content extends BaseEntity {
    @NotBlank
    @Size(max = 255)
    @Column(nullable = false)
    private String title;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    // Path where the file is stored
    @NotBlank
    @Column(name = "file_path", nullable = false)
    private String filePath;

    // Original filename from the upload
    @NotBlank
    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    // Type of file (PDF, video, image)
    @Enumerated(EnumType.STRING)
    @Column(name = "file_type", nullable = false)
    private FileType fileType;

    // Size of the file in bytes
    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    // MIME type of the file
    @NotBlank
    @Column(name = "content_type", nullable = false)
    private String contentType;

    // The course this content is associated with
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // The user who uploaded this content
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by_id")
    private User uploadedBy;

    // Status of the content
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentStatus status = ContentStatus.ACTIVE;

    // Optional order within the course (for sequencing content)
    private Integer displayOrder;

    @Override
    public String toString() {
        return "Content{" +
                "id=" + getId() +
                ", title='" + title + '\'' +
                ", fileType=" + fileType +
                ", fileSize=" + fileSize +
                ", status=" + status +
                '}';
    }

}
