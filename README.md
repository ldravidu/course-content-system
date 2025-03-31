# Course Content Manager

A containerized application for managing course content with a Spring Boot backend, React frontend, and PostgreSQL database.

## Features

- Advanced content management with support for multiple file types (PDF, Video, Images)
- Structured course organization with status tracking
- Role-based access control (Student, Instructor, Admin)
- Secure file storage with unique identifiers
- Responsive React frontend with real-time updates
- RESTful API with JWT authentication
- Paginated content listing and efficient file streaming

## Project Structure

```
course-content-manager/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Java source files
│   │   │   └── resources/ # Application properties
│   │   └── test/          # Test files
│   ├── uploads/           # Content storage directory
│   ├── pom.xml           # Maven configuration
│   └── Dockerfile        # Backend containerization
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API integration
│   ├── package.json     # NPM dependencies
│   └── Dockerfile       # Frontend containerization
└── docs/                # Documentation
```

## Technology Stack

### Backend

- Java 21
- Spring Boot 3.4.4
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL Database
- MapStruct for DTO mapping
- Lombok for boilerplate reduction
- Embedded PostgreSQL for testing

### Frontend

- React 19
- React Router v7
- Axios for API communication
- Tailwind CSS for styling
- Vite for build tooling

## Docker Deployment

### Prerequisites

- Docker
- Docker Compose
- SSL certificate (for production)

### Development Setup

```bash
# Start the application in development mode
docker compose up

# Access the services:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# Database: PostgreSQL on port 5432
```

### Production Deployment

1. Create a `.env` file in the root directory:

```bash
DB_NAME=coursedb
DB_USER=postgres
DB_PASSWORD=your_secure_password
JWT_SECRET=your-secure-jwt-secret
FILE_STORAGE_PATH=/data/uploads
PORT=80
```

2. Deploy using production configuration:

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Security Configuration

- Enable HTTPS in production
- Configure database encryption
- Set up regular backups
- Implement rate limiting
- Configure WAF
- Regular security updates
- File upload virus scanning

### Maintenance

#### Database Backups

```bash
# Backup the database
docker exec postgres pg_dump -U $DB_USER $DB_NAME > backup.sql

# Restore from backup
docker exec -i postgres psql -U $DB_USER $DB_NAME < backup.sql
```

## API Documentation

### Authentication

- POST `/api/auth/login`: User authentication
- POST `/api/auth/register`: User registration

### Content Management

- GET `/api/content`: List all content (paginated)
- POST `/api/content`: Upload new content (multipart/form-data)
- GET `/api/content/{id}`: Get content metadata
- GET `/api/content/{id}/file`: Download content file
- PUT `/api/content/{id}`: Update content metadata
- DELETE `/api/content/{id}`: Delete content

### Course Management

- GET `/api/courses`: List all courses (paginated)
- POST `/api/courses`: Create new course
- GET `/api/courses/{id}`: Get course details
- PUT `/api/courses/{id}`: Update course
- DELETE `/api/courses/{id}`: Delete course
- GET `/api/courses/{id}/content`: List course content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file

## Authors

- Ravidu Liyanage - Initial work
