package com.coursecontentsystem.service;

import com.coursecontentsystem.dto.CourseCreationDTO;
import com.coursecontentsystem.dto.CourseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    CourseDTO createCourse(CourseCreationDTO courseCreationDTO, Long instructorId);

    CourseDTO getCourseById(Long id);

    Page<CourseDTO> getAllCourses(Pageable pageable);

    Page<CourseDTO> getCoursesByInstructor(Long instructorId, Pageable pageable);

    Page<CourseDTO> getCoursesForStudent(Long studentId, Pageable pageable);

    CourseDTO updateCourse(Long id, CourseCreationDTO courseUpdateDTO);

    void deleteCourse(Long id);

    void enrollStudent(Long courseId, Long studentId);

    void unenrollStudent(Long courseId, Long studentId);

    Page<CourseDTO> searchCourses(String searchTerm, Pageable pageable);
}
