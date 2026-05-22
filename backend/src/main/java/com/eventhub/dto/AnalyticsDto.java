package com.eventhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class AnalyticsDto {
    private long totalUsers;
    private long totalEvents;
    private long totalBookings;
    private BigDecimal totalRevenue;
    private long activeEvents;
    private long confirmedBookings;
}
