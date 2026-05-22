package com.eventhub.controller;

import com.eventhub.dto.ReviewDto.*;
import com.eventhub.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(@RequestBody ReviewRequest request,
                                                     @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reviewService.addReview(request, userDetails.getUsername()));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<ReviewResponse>> getEventReviews(@PathVariable Long eventId) {
        return ResponseEntity.ok(reviewService.getEventReviews(eventId));
    }
}
