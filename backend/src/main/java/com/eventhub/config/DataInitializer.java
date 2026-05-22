package com.eventhub.config;

import com.eventhub.entity.Event;
import com.eventhub.entity.User;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedEvents();
    }

    private void seedAdmin() {
        if (!userRepository.existsByEmail("admin@eventhub.com")) {
                userRepository.save(User.builder()
                    .name("Admin User")
                    .email("admin@eventhub.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .build());
                log.info("Admin user seeded") ;
        }
    }

    private void seedEvents() {
        if (eventRepository.count() > 0) return;

        Object[][] events = {
            {"Tech Summit 2024", "Annual technology conference featuring the latest innovations in AI, cloud computing, and software development.", "Technology", "Mumbai Convention Center", "2024-08-15", "09:00", "TechCorp India", 1500.00, 500, "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"},
            {"Music Fest Goa", "Three-day music festival with top artists from across India and international performers.", "Music", "Goa Beach Arena", "2024-09-20", "18:00", "Goa Events", 2500.00, 2000, "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"},
            {"Startup Pitch Night", "Entrepreneurs pitch their ideas to top investors. Networking and funding opportunities.", "Business", "Bangalore Innovation Hub", "2024-07-30", "17:00", "StartupIndia", 500.00, 200, "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800"},
            {"Art & Culture Expo", "Celebrating Indian art, culture, and heritage with exhibitions, performances, and workshops.", "Arts", "Delhi Cultural Center", "2024-08-05", "10:00", "Culture Ministry", 300.00, 1000, "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"},
            {"Marathon 2024", "Annual city marathon with 5K, 10K, and full marathon categories. Open to all fitness levels.", "Sports", "Chennai Marina Beach", "2024-10-06", "06:00", "Chennai Sports Club", 800.00, 3000, "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800"},
            {"Food & Wine Festival", "Explore cuisines from 20+ countries with live cooking demos and wine tasting sessions.", "Food", "Hyderabad Exhibition Grounds", "2024-08-25", "12:00", "Foodie Events", 1200.00, 800, "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"},
            {"Health & Wellness Retreat", "A weekend of yoga, meditation, and wellness workshops led by top experts.", "Health", "Rishikesh Retreat Center", "2024-09-10", "08:00", "Wellness Collective", 1800.00, 120, "https://images.unsplash.com/photo-1552083375-1448c94f42df?w=800"},
            {"Education Bootcamp", "Hands-on training in coding, design thinking, and product management for students and professionals.", "Education", "Bengaluru Learning Campus", "2024-07-22", "10:00", "LearnX", 900.00, 150, "https://images.unsplash.com/photo-1537432376769-00a84e3f0a0b?w=800"},
            {"Film Premiere Night", "Exclusive screening of an upcoming film with director Q&A and red carpet reception.", "Film", "Mumbai Film House", "2024-08-30", "19:00", "Cinema Circle", 1200.00, 220, "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=800"},
            {"Fashion Fusion Show", "A showcase of emerging fashion labels, live styling sessions, and designer meet-and-greets.", "Fashion", "Delhi Fashion Plaza", "2024-10-05", "16:00", "Style Sphere", 1500.00, 300, "https://images.unsplash.com/photo-1495121605193-b116b5b9c5d0?w=800"},
            {"Startup Networking Evening", "Connect with founders, investors, and mentors over lightning pitches and refreshments.", "Networking", "Hyderabad Innovation Hub", "2024-09-05", "18:30", "Startup India", 700.00, 180, "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=800"},
        };

        for (Object[] e : events) {
            int seats = (int) e[8];
            eventRepository.save(Event.builder()
                    .title((String) e[0])
                    .description((String) e[1])
                    .category((String) e[2])
                    .location((String) e[3])
                    .date(LocalDate.parse((String) e[4]))
                    .time(LocalTime.parse((String) e[5]))
                    .organizer((String) e[6])
                    .price(BigDecimal.valueOf((double) e[7]))
                    .totalSeats(seats)
                    .availableSeats(seats)
                    .imageUrl((String) e[9])
                    .status(Event.Status.ACTIVE)
                    .build());
        }
        log.info("Sample events seeded successfully");
        System.out.println("✅ Sample events seeded");
    }
}
