package com.eventhub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    private LocalDateTime bookingDate;
    private Integer ticketCount;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private BookingStatus bookingStatus = BookingStatus.CONFIRMED;

    @PrePersist
    protected void onCreate() {
        bookingDate = LocalDateTime.now();
    }

    public enum PaymentStatus {
        PENDING, PAID, REFUNDED
    }

    public enum BookingStatus {
        CONFIRMED, CANCELLED
    }
}
