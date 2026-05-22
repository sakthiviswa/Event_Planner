package com.eventhub.repository;

import com.eventhub.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByEventId(Long eventId);

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b WHERE b.paymentStatus = 'PAID'")
    BigDecimal sumTotalRevenue();

    long countByBookingStatus(Booking.BookingStatus status);
}
