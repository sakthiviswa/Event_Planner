package com.eventhub.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String profileImage;
    private LocalDateTime createdAt;
}
