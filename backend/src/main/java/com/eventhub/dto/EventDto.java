package com.eventhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventDto {
    private Long id;
    @NotBlank private String title;
    private String description;
    private String category;
    private String location;
    @NotNull private LocalDate date;
    private LocalTime time;
    private String organizer;
    private BigDecimal price;
    private Integer totalSeats;
    private Integer availableSeats;
    private String imageUrl;
    private String status;
}
