package com.coursecontentsystem.dto;

import com.coursecontentsystem.model.UserRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private LocalDateTime createdAt;
    private Long version;
    private String username;
    private String email;
    // No password field in response DTO for security
    private String firstName;
    private String lastName;
    private UserRole role;
}
