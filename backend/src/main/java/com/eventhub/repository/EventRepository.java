package com.eventhub.repository;

import com.eventhub.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByCategory(String category);

    @Query("SELECT e FROM Event e WHERE " +
           "(:search IS NULL OR LOWER(e.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.location) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:category IS NULL OR e.category = :category) AND " +
           "e.status = 'ACTIVE'")
    List<Event> searchEvents(@Param("search") String search, @Param("category") String category);

    long countByStatus(Event.Status status);
}
