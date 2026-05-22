package com.eventhub.service;

import com.eventhub.dto.AnalyticsDto;
import com.eventhub.entity.Booking;
import com.eventhub.entity.Event;
import com.eventhub.repository.BookingRepository;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    public AnalyticsDto getAnalytics() {
        return new AnalyticsDto(
                userRepository.count(),
                eventRepository.count(),
                bookingRepository.count(),
                bookingRepository.sumTotalRevenue(),
                eventRepository.countByStatus(Event.Status.ACTIVE),
                bookingRepository.countByBookingStatus(Booking.BookingStatus.CONFIRMED)
        );
    }
}
