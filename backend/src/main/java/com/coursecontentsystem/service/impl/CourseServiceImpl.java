package com.coursecontentsystem.service.impl;

import com.coursecontentsystem.dto.CourseCreationDTO;
import com.coursecontentsystem.dto.CourseDTO;
import com.coursecontentsystem.mapper.CourseMapper;
import com.coursecontentsystem.model.Course;
import com.coursecontentsystem.model.User;
import com.coursecontentsystem.repository.CourseRepository;
import com.coursecontentsystem.repository.UserRepository;
import com.coursecontentsystem.service.CourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseServiceImpl implements CourseService {
        private final CourseRepository courseRepository;
        private final UserRepository userRepository;
        private final CourseMapper courseMapper;

        @Override
        public CourseDTO createCourse(CourseCreationDTO dto, Long instructorId) {
                User instructor = userRepository.findById(instructorId)
                                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));

                Course course = courseMapper.toEntity(dto);
                course.setInstructor(instructor);
                return courseMapper.toDTO(courseRepository.save(course));
        }

        @Override
        public CourseDTO getCourseById(Long id) {
                return courseRepository.findById(id)
                                .map(courseMapper::toDTO)
                                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        }

        @Override
        public Page<CourseDTO> getAllCourses(Pageable pageable) {
                return courseRepository.findAll(pageable).map(courseMapper::toDTO);
        }

        @Override
        public Page<CourseDTO> getCoursesByInstructor(Long instructorId, Pageable pageable) {
                User instructor = userRepository.findById(instructorId)
                                .orElseThrow(() -> new EntityNotFoundException("Instructor not found"));
                return courseRepository.findByInstructor(instructor, pageable)
                                .map(courseMapper::toDTO);
        }

        @Override
        public Page<CourseDTO> getCoursesForStudent(Long studentId, Pageable pageable) {
                User student = userRepository.findById(studentId)
                                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
                return courseRepository.findCoursesEnrolledByStudent(student, pageable)
                                .map(courseMapper::toDTO);
        }

        @Override
        public CourseDTO updateCourse(Long id, CourseCreationDTO dto) {
                Course course = courseRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

                courseMapper.updateEntity(course, dto);
                return courseMapper.toDTO(courseRepository.save(course));
        }

        @Override
        public void deleteCourse(Long id) {
                courseRepository.deleteById(id);
        }

        @Override
        public void enrollStudent(Long courseId, Long studentId) {
                Course course = courseRepository.findById(courseId)
                                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
                User student = userRepository.findById(studentId)
                                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

                course.getEnrolledStudents().add(student);
                student.getEnrolledCourses().add(course);
                courseRepository.save(course);
        }

        @Override
        public void unenrollStudent(Long courseId, Long studentId) {
                Course course = courseRepository.findById(courseId)
                                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
                User student = userRepository.findById(studentId)
                                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

                course.getEnrolledStudents().remove(student);
                student.getEnrolledCourses().remove(course);
                courseRepository.save(course);
        }

        @Override
        public Page<CourseDTO> searchCourses(String searchTerm, Pageable pageable) {
                if (searchTerm == null || searchTerm.trim().isEmpty()) {
                        return Page.empty();
                }
                return courseRepository.searchCourses(searchTerm, pageable)
                                .map(courseMapper::toDTO);
        }
}
