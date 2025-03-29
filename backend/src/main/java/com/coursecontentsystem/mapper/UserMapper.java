package com.coursecontentsystem.mapper;

import com.coursecontentsystem.dto.UserCreationDTO;
import com.coursecontentsystem.dto.UserDTO;
import com.coursecontentsystem.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "instructCourses", ignore = true)
    @Mapping(target = "enrolledCourses", ignore = true)
    @Mapping(target = "uploadedContents", ignore = true)
    User toEntity(UserCreationDTO userCreationDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "instructCourses", ignore = true)
    @Mapping(target = "enrolledCourses", ignore = true)
    @Mapping(target = "uploadedContents", ignore = true)
    void updateEntity(@MappingTarget User user, UserCreationDTO userCreationDTO);
}
