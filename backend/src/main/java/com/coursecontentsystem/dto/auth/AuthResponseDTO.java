package com.coursecontentsystem.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class AuthResponseDTO {
    String token;
    String tokenType;
    String username;
}
