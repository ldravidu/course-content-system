package com.coursecontentsystem.repository;

import com.coursecontentsystem.model.Course;
import com.coursecontentsystem.model.CourseStatus;
import com.coursecontentsystem.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Course entity.
 * Spring Data JPA automatically implements basic CRUD operations.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    /**
     * Find all courses taught by a specific instructor.
     * 
     * @param instructor the instructor user
     * @return list of courses
     */
    List<Course> findByInstructor(User instructor);

    /**
     * Find all courses taught by a specific instructor with pagination.
     * 
     * @param instructor the instructor user
     * @param pageable   pagination information
     * @return page of courses
     */
    Page<Course> findByInstructor(User instructor, Pageable pageable);

    /**
     * Find all published courses.
     * 
     * @return list of published courses
     */
    List<Course> findByStatus(CourseStatus status);

    /**
     * Find a course by its course code.
     * 
     * @param courseCode the course code
     * @return an Optional containing the course if found
     */
    Optional<Course> findByCourseCode(String courseCode);

    /**
     * Search for courses by title or description containing the search term.
     * 
     * @param searchTerm the search term
     * @param pageable   pagination information
     * @return page of matching courses
     */
    @Query("SELECT c FROM Course c WHERE " +
            "LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Course> searchCourses(@Param("searchTerm") String searchTerm, Pageable pageable);

    /**
     * Find all courses in which a student is enrolled.
     * 
     * @param student the student user
     * @return list of courses
     */
    @Query("SELECT c FROM Course c JOIN c.enrolledStudents s WHERE s = :student")
    List<Course> findCoursesEnrolledByStudent(@Param("student") User student);

    /**
     * Find all courses in which a student is enrolled with pagination.
     * 
     * @param student  the student user
     * @param pageable pagination information
     * @return page of courses
     */
    @Query("SELECT c FROM Course c JOIN c.enrolledStudents s WHERE s = :student")
    Page<Course> findCoursesEnrolledByStudent(@Param("student") User student, Pageable pageable);
}