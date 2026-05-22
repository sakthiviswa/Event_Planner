package com.eventhub.service;

import com.eventhub.dto.EventDto;
import com.eventhub.entity.User;
import com.eventhub.entity.Wishlist;
import com.eventhub.exception.BadRequestException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.UserRepository;
import com.eventhub.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventService eventService;

    public void addToWishlist(Long eventId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (wishlistRepository.existsByUserIdAndEventId(user.getId(), eventId)) {
            throw new BadRequestException("Event already in wishlist");
        }
        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .event(eventRepository.findById(eventId)
                        .orElseThrow(() -> new ResourceNotFoundException("Event not found")))
                .build();
        wishlistRepository.save(wishlist);
    }

    @Transactional
    public void removeFromWishlist(Long eventId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        wishlistRepository.deleteByUserIdAndEventId(user.getId(), eventId);
    }

    public List<EventDto> getWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return wishlistRepository.findByUserId(user.getId())
                .stream()
                .map(w -> eventService.getEventById(w.getEvent().getId()))
                .collect(Collectors.toList());
    }
}
