package com.coursecontentsystem.repository;

import com.coursecontentsystem.model.Content;
import com.coursecontentsystem.model.Course;
import com.coursecontentsystem.model.FileType;
import com.coursecontentsystem.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Content entity.
 * Spring Data JPA automatically implements basic CRUD operations.
 */
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    /**
     * Find all content belonging to a specific course.
     * 
     * @param course the course
     * @return list of content
     */
    List<Content> findByCourse(Course course);

    /**
     * Find all content belonging to a specific course with pagination.
     * 
     * @param course   the course
     * @param pageable pagination information
     * @return page of content
     */
    Page<Content> findByCourse(Course course, Pageable pageable);

    /**
     * Find all content uploaded by a specific user.
     * 
     * @param user the user
     * @return list of content
     */
    List<Content> findByUploadedBy(User user);

    /**
     * Find all content uploaded by a specific user with pagination.
     * 
     * @param user     the user
     * @param pageable pagination information
     * @return page of content
     */
    Page<Content> findByUploadedBy(User user, Pageable pageable);

    /**
     * Find all content of a specific file type.
     * 
     * @param fileType the file type
     * @param pageable pagination information
     * @return page of content
     */
    Page<Content> findByFileType(FileType fileType, Pageable pageable);

    /**
     * Search for content by title or description containing the search term.
     * 
     * @param searchTerm the search term
     * @param pageable   pagination information
     * @return page of matching content
     */
    @Query("SELECT c FROM Content c WHERE " +
            "LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Content> searchContent(@Param("searchTerm") String searchTerm, Pageable pageable);

    /**
     * Find content by course and file type.
     * 
     * @param course   the course
     * @param fileType the file type
     * @return list of content
     */
    List<Content> findByCourseAndFileType(Course course, FileType fileType);

    /**
     * Count the number of content items in a course.
     * 
     * @param course the course
     * @return the count
     */
    long countByCourse(Course course);
}