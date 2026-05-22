package com.eventhub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private String organizer;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private Integer totalSeats;
    private Integer availableSeats;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, INACTIVE, CANCELLED
    }
}
