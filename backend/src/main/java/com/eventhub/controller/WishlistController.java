package com.eventhub.controller;

import com.eventhub.dto.EventDto;
import com.eventhub.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/{eventId}")
    public ResponseEntity<Void> add(@PathVariable Long eventId,
                                     @AuthenticationPrincipal UserDetails userDetails) {
        wishlistService.addToWishlist(eventId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> remove(@PathVariable Long eventId,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        wishlistService.removeFromWishlist(eventId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getWishlist(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(wishlistService.getWishlist(userDetails.getUsername()));
    }
}
