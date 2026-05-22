package com.eventhub.service;

import com.eventhub.dto.BookingDto.*;
import com.eventhub.entity.Booking;
import com.eventhub.entity.Event;
import com.eventhub.entity.User;
import com.eventhub.exception.BadRequestException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.BookingRepository;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public BookingResponse createBooking(BookingRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (event.getAvailableSeats() < request.getTicketCount()) {
            throw new BadRequestException("Not enough seats available");
        }

        event.setAvailableSeats(event.getAvailableSeats() - request.getTicketCount());
        eventRepository.save(event);

        BigDecimal total = event.getPrice().multiply(BigDecimal.valueOf(request.getTicketCount()));
        Booking booking = Booking.builder()
                .user(user)
                .event(event)
                .ticketCount(request.getTicketCount())
                .totalPrice(total)
                .paymentStatus(Booking.PaymentStatus.PAID)
                .bookingStatus(Booking.BookingStatus.CONFIRMED)
                .build();
        booking = bookingRepository.save(booking);

        notificationService.createNotification(user,
                "Booking Confirmed",
                "Your booking for " + event.getTitle() + " is confirmed!");

        return toResponse(booking);
    }

    public List<BookingResponse> getUserBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserId(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public void cancelBooking(Long bookingId, String email) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getUser().getEmail().equals(email)) {
            throw new BadRequestException("Unauthorized");
        }
        booking.setBookingStatus(Booking.BookingStatus.CANCELLED);
        booking.setPaymentStatus(Booking.PaymentStatus.REFUNDED);

        Event event = booking.getEvent();
        event.setAvailableSeats(event.getAvailableSeats() + booking.getTicketCount());
        eventRepository.save(event);
        bookingRepository.save(booking);
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    private BookingResponse toResponse(Booking b) {
        BookingResponse res = new BookingResponse();
        res.setId(b.getId());
        res.setEventId(b.getEvent().getId());
        res.setEventTitle(b.getEvent().getTitle());
        res.setEventLocation(b.getEvent().getLocation());
        res.setEventDate(b.getEvent().getDate() != null ? b.getEvent().getDate().toString() : null);
        res.setEventTime(b.getEvent().getTime() != null ? b.getEvent().getTime().toString() : null);
        res.setEventImageUrl(b.getEvent().getImageUrl());
        res.setTicketCount(b.getTicketCount());
        res.setTotalPrice(b.getTotalPrice());
        res.setTicketCode(String.format("TICKET-%06d", b.getId()));
        res.setPaymentStatus(b.getPaymentStatus().name());
        res.setBookingStatus(b.getBookingStatus().name());
        res.setBookingDate(b.getBookingDate());
        return res;
    }
}
