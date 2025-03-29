package com.coursecontentsystem.controller;

import com.coursecontentsystem.dto.ContentDTO;
import com.coursecontentsystem.dto.CourseCreationDTO;
import com.coursecontentsystem.dto.CourseDTO;
import com.coursecontentsystem.service.ContentService;
import com.coursecontentsystem.service.CourseService;
import com.coursecontentsystem.security.SecurityUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final ContentService contentService;

    @GetMapping
    public ResponseEntity<Page<CourseDTO>> getAllCourses(Pageable pageable) {
        return ResponseEntity.ok(courseService.getAllCourses(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(
            @RequestBody @Valid CourseCreationDTO courseDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long instructorId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(courseService.createCourse(courseDTO, instructorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(
            @PathVariable Long id,
            @RequestBody @Valid CourseCreationDTO courseDTO) {
        return ResponseEntity.ok(courseService.updateCourse(id, courseDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/content")
    public ResponseEntity<Page<ContentDTO>> getCourseContent(
            @PathVariable Long id,
            Pageable pageable) {
        return ResponseEntity.ok(contentService.getContentByCourse(id, pageable));
    }

    // Helper method to get user ID from UserDetails
    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        return ((SecurityUser) userDetails).getId();
    }
}
