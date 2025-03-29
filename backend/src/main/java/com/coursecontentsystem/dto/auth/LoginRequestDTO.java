package com.coursecontentsystem.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class LoginRequestDTO {
    @NotBlank(message = "Username is required")
    String username;

    @NotBlank(message = "Password is required")
    String password;
}
