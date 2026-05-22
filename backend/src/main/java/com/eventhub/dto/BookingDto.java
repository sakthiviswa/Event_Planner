package com.eventhub.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingDto {

    @Data
    public static class BookingRequest {
        private Long eventId;
        private Integer ticketCount;
    }

    @Data
    public static class BookingResponse {
        private Long id;
        private Long eventId;
        private String eventTitle;
        private String eventLocation;
        private String eventDate;
        private String eventTime;
        private String eventImageUrl;
        private Integer ticketCount;
        private BigDecimal totalPrice;
        private String ticketCode;
        private String paymentStatus;
        private String bookingStatus;
        private LocalDateTime bookingDate;
    }
}
