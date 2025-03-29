package com.coursecontentsystem.exception;

import lombok.Value;
import java.time.LocalDateTime;

@Value
public class ApiError {
    String message;
    LocalDateTime timestamp = LocalDateTime.now();
}
