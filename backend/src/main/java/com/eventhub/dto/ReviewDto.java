package com.eventhub.dto;

import lombok.Data;

public class ReviewDto {

    @Data
    public static class ReviewRequest {
        private Long eventId;
        private Integer rating;
        private String comment;
    }

    @Data
    public static class ReviewResponse {
        private Long id;
        private Long userId;
        private String userName;
        private Long eventId;
        private Integer rating;
        private String comment;
    }
}
