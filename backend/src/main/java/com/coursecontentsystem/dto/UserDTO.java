package com.coursecontentsystem.dto;

import com.coursecontentsystem.model.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDTO extends BaseDTO {
    private String username;
    private String email;
    // No password field in response DTO for security
    private String firstName;
    private String lastName;
    private UserRole role;
}
