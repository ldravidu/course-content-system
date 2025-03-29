package com.coursecontentsystem.mapper;

import com.coursecontentsystem.dto.CourseCreationDTO;
import com.coursecontentsystem.dto.CourseDTO;
import com.coursecontentsystem.model.Course;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(target = "instructorId", source = "instructor.id")
    @Mapping(target = "instructorName", expression = "java(course.getInstructor().getFirstName() + \" \" + course.getInstructor().getLastName())")
    @Mapping(target = "enrolledStudentsCount", expression = "java(course.getEnrolledStudents().size())")
    @Mapping(target = "contentItemsCount", expression = "java(course.getContentItems().size())")
    CourseDTO toDTO(Course course);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "enrolledStudents", ignore = true)
    @Mapping(target = "contentItems", ignore = true)
    @Mapping(target = "status", constant = "DRAFT")
    Course toEntity(CourseCreationDTO courseCreationDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "instructor", ignore = true)
    @Mapping(target = "enrolledStudents", ignore = true)
    @Mapping(target = "contentItems", ignore = true)
    void updateEntity(@MappingTarget Course course, CourseCreationDTO courseCreationDTO);
}
