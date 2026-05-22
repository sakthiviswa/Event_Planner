package com.eventhub.service;

import com.eventhub.dto.ReviewDto.*;
import com.eventhub.entity.Review;
import com.eventhub.entity.User;
import com.eventhub.exception.BadRequestException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.ReviewRepository;
import com.eventhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public ReviewResponse addReview(ReviewRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (reviewRepository.existsByUserIdAndEventId(user.getId(), request.getEventId())) {
            throw new BadRequestException("You have already reviewed this event");
        }
        Review review = Review.builder()
                .user(user)
                .event(eventRepository.findById(request.getEventId())
                        .orElseThrow(() -> new ResourceNotFoundException("Event not found")))
                .rating(request.getRating())
                .comment(request.getComment())
                .build();
        return toResponse(reviewRepository.save(review));
    }

    public List<ReviewResponse> getEventReviews(Long eventId) {
        return reviewRepository.findByEventId(eventId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private ReviewResponse toResponse(Review r) {
        ReviewResponse res = new ReviewResponse();
        res.setId(r.getId());
        res.setUserId(r.getUser().getId());
        res.setUserName(r.getUser().getName());
        res.setEventId(r.getEvent().getId());
        res.setRating(r.getRating());
        res.setComment(r.getComment());
        return res;
    }
}
