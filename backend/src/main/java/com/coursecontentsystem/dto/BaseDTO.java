package com.coursecontentsystem.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public abstract class BaseDTO {
    private Long id;
    private LocalDateTime createdAt;
    private Long version;
}