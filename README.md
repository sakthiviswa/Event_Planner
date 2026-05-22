# EventHub - Full Stack Event Management System

A modern event management and ticket booking platform built with React.js, Spring Boot, and PostgreSQL.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React.js 18, Vite, React Router 6 |
| Backend   | Spring Boot 3.2, Spring Security  |
| Database  | PostgreSQL                        |
| Auth      | JWT (jjwt 0.11.5)                 |
| Styling   | Custom CSS (Glassmorphism)        |

---

## Project Structure

```
event management/
├── backend/          ← Spring Boot application
└── frontend/         ← React.js application
```

---

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- PostgreSQL 14+

---

## Database Setup

1. Open pgAdmin or psql
2. Create the database:
   ```sql
   CREATE DATABASE eventhub_db;
   ```
3. Run the schema file:
   ```
   backend/src/main/resources/data.sql
   ```

Default admin credentials (from seed data):
- Email: `admin@eventhub.com`
- Password: `admin123`

---

## Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

### Configure Database (if needed)
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eventhub_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

---

## Features

### Authentication
- Single auth page with animated tabs (User Login / Sign Up / Admin Login)
- JWT token-based authentication
- Role-based access control (USER / ADMIN)
- Password show/hide toggle
- Form validation with error messages

### User Features
- Browse & search events with filters by category
- View event details with image banner
- Book tickets with quantity selection
- Cancel bookings
- Wishlist (save/remove events)
- View booking history
- Rate & review events
- Notifications (booking confirmations)
- Update profile

### Admin Features
- Dashboard with analytics cards
- Create / Edit / Delete events
- Manage all users (view, delete)
- View all bookings
- Analytics with key metrics

---

## API Endpoints

### Auth
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/auth/register    | User registration  |
| POST   | /api/auth/login       | User login         |
| POST   | /api/admin/login      | Admin login        |

### Events
| Method | Endpoint              | Auth     |
|--------|-----------------------|----------|
| GET    | /api/events           | Public   |
| GET    | /api/events/{id}      | Public   |
| POST   | /api/events           | Admin    |
| PUT    | /api/events/{id}      | Admin    |
| DELETE | /api/events/{id}      | Admin    |

### Bookings
| Method | Endpoint              | Auth     |
|--------|-----------------------|----------|
| POST   | /api/bookings         | User     |
| GET    | /api/bookings/my      | User     |
| DELETE | /api/bookings/{id}    | User     |

### Admin
| Method | Endpoint              | Auth     |
|--------|-----------------------|----------|
| GET    | /api/admin/users      | Admin    |
| DELETE | /api/admin/users/{id} | Admin    |
| GET    | /api/admin/bookings   | Admin    |
| GET    | /api/admin/analytics  | Admin    |

---

## Default Routes

| Route                  | Access    | Description          |
|------------------------|-----------|----------------------|
| /                      | Public    | Landing page         |
| /auth                  | Public    | Login/Signup/Admin   |
| /events                | User      | Browse events        |
| /events/:id            | User      | Event details        |
| /my-bookings           | User      | Booking history      |
| /wishlist              | User      | Saved events         |
| /notifications         | User      | Notifications        |
| /profile               | User      | User profile         |
| /admin/dashboard       | Admin     | Admin dashboard      |
| /admin/create-event    | Admin     | Create event         |
| /admin/events          | Admin     | Manage events        |
| /admin/users           | Admin     | Manage users         |
| /admin/bookings        | Admin     | All bookings         |
| /admin/analytics       | Admin     | Analytics            |
