package com.eventhub.controller;

import com.eventhub.dto.BookingDto.*;
import com.eventhub.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> book(@RequestBody BookingRequest request,
                                                 @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.createBooking(request, userDetails.getUsername()));
    }

    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> myBookings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getUserBookings(userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        bookingService.cancelBooking(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
