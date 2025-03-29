package com.coursecontentsystem.mapper;

import com.coursecontentsystem.dto.ContentCreationDTO;
import com.coursecontentsystem.dto.ContentDTO;
import com.coursecontentsystem.dto.ContentUpdateDTO;
import com.coursecontentsystem.model.Content;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ContentMapper {

    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseName", source = "course.title")
    @Mapping(target = "uploadedById", source = "uploadedBy.id")
    @Mapping(target = "uploadedByName", expression = "java(content.getUploadedBy().getFirstName() + \" \" + content.getUploadedBy().getLastName())")
    @Mapping(target = "contentUrl", ignore = true)
    ContentDTO toDTO(Content content);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "uploadedBy", ignore = true)
    @Mapping(target = "filePath", ignore = true)
    @Mapping(target = "originalFilename", ignore = true)
    @Mapping(target = "fileType", ignore = true)
    @Mapping(target = "fileSize", ignore = true)
    @Mapping(target = "contentType", ignore = true)
    @Mapping(target = "status", constant = "ACTIVE")
    Content toEntity(ContentCreationDTO contentCreationDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "uploadedBy", ignore = true)
    @Mapping(target = "filePath", ignore = true)
    @Mapping(target = "originalFilename", ignore = true)
    @Mapping(target = "fileType", ignore = true)
    @Mapping(target = "fileSize", ignore = true)
    @Mapping(target = "contentType", ignore = true)
    void updateEntity(@MappingTarget Content content, ContentUpdateDTO contentUpdateDTO);
}
