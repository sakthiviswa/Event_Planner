package com.eventhub.service;

import com.eventhub.dto.EventDto;
import com.eventhub.entity.Event;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<EventDto> getAllEvents(String search, String category) {
        List<Event> events = (search != null || category != null)
                ? eventRepository.searchEvents(search, category)
                : eventRepository.findAll();
        return events.stream().map(this::toDto).collect(Collectors.toList());
    }

    public EventDto getEventById(Long id) {
        return toDto(findById(id));
    }

    public EventDto createEvent(EventDto dto) {
        Event event = toEntity(dto);
        event.setAvailableSeats(dto.getTotalSeats());
        return toDto(eventRepository.save(event));
    }

    public EventDto updateEvent(Long id, EventDto dto) {
        Event event = findById(id);
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setCategory(dto.getCategory());
        event.setLocation(dto.getLocation());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setOrganizer(dto.getOrganizer());
        event.setPrice(dto.getPrice());
        event.setTotalSeats(dto.getTotalSeats());
        event.setImageUrl(dto.getImageUrl());
        if (dto.getStatus() != null) {
            event.setStatus(Event.Status.valueOf(dto.getStatus()));
        }
        return toDto(eventRepository.save(event));
    }

    public void deleteEvent(Long id) {
        eventRepository.delete(findById(id));
    }

    private Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    private EventDto toDto(Event e) {
        EventDto dto = new EventDto();
        dto.setId(e.getId());
        dto.setTitle(e.getTitle());
        dto.setDescription(e.getDescription());
        dto.setCategory(e.getCategory());
        dto.setLocation(e.getLocation());
        dto.setDate(e.getDate());
        dto.setTime(e.getTime());
        dto.setOrganizer(e.getOrganizer());
        dto.setPrice(e.getPrice());
        dto.setTotalSeats(e.getTotalSeats());
        dto.setAvailableSeats(e.getAvailableSeats());
        dto.setImageUrl(e.getImageUrl());
        dto.setStatus(e.getStatus() != null ? e.getStatus().name() : null);
        return dto;
    }

    private Event toEntity(EventDto dto) {
        return Event.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .location(dto.getLocation())
                .date(dto.getDate())
                .time(dto.getTime())
                .organizer(dto.getOrganizer())
                .price(dto.getPrice())
                .totalSeats(dto.getTotalSeats())
                .imageUrl(dto.getImageUrl())
                .build();
    }
}

