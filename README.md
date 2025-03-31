# Course Content Manager

A containerized application for managing course content with a Spring Boot backend, React frontend, and PostgreSQL database.

## Features

- Advanced content management with support for multiple file types:
  - Documents (PDF)
  - Videos (MP4)
  - Images (JPG, JPEG, PNG)
- Structured course organization with status tracking (Draft, Published, Archived)
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

## Getting Started

### Prerequisites

- Java 21 or higher
- Node.js 16 or higher
- PostgreSQL 13 or higher
- Maven 3.6 or higher

### Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/ldravidu/course-content-manager.git
   cd course-content-manager
   ```

2. Configure the database

   ```properties
   # Update backend/src/main/resources/application.properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/courses_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Start the backend

   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. Start the frontend

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

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

## Production Deployment Guide

### Prerequisites

- PostgreSQL 13 or higher
- Java 17 or higher
- Node.js 16 or higher
- SSL certificate
- Linux server with minimum 2GB RAM

### Environment Variables

Set the following environment variables:

```bash
# Database
export JDBC_DATABASE_URL=jdbc:postgresql://your-db-host:5432/courses_db
export JDBC_DATABASE_USERNAME=production_user
export JDBC_DATABASE_PASSWORD=secure_password

# Security
export JWT_SECRET=your-secure-jwt-secret-at-least-32-chars
export PORT=8080

# File Storage
export FILE_STORAGE_PATH=/data/uploads
```

### Database Setup

1. Create production database:

```sql
CREATE DATABASE courses_db;
CREATE USER production_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE courses_db TO production_user;
```

2. Configure PostgreSQL:

```conf
# postgresql.conf
max_connections = 100
shared_buffers = 512MB
effective_cache_size = 1536MB
work_mem = 5242kB
maintenance_work_mem = 128MB
```

### Backend Deployment

1. Build the application:

```bash
cd backend
./mvnw clean package -Pprod
```

2. Run with production profile:

```bash
java -jar target/course-content-system.jar \
  --spring.profiles.active=prod \
  -Xms1g -Xmx1g \
  -XX:+HeapDumpOnOutOfMemoryError
```

3. Setup systemd service:

```ini
[Unit]
Description=Course Content System
After=network.target

[Service]
Environment=SPRING_PROFILES_ACTIVE=prod
Environment=JDBC_DATABASE_URL=jdbc:postgresql://localhost:5432/courses_db
Environment=JDBC_DATABASE_USERNAME=production_user
Environment=JDBC_DATABASE_PASSWORD=secure_password
Environment=JWT_SECRET=your-secure-jwt-secret
Type=simple
User=courseapp
ExecStart=/usr/bin/java -jar /opt/courseapp/course-content-system.jar
Restart=always

[Install]
WantedBy=multi-user.target
```

### Frontend Deployment

1. Build frontend:

```bash
cd frontend
npm ci
npm run build
```

### Maintenance

1. Database Backups:

```bash
# Add to crontab
0 2 * * * pg_dump -Fc courses_db > /backup/courses_db_$(date +\%Y\%m\%d).dump
0 3 * * * find /backup/ -name "courses_db_*.dump" -mtime +7 -delete
```

2. Log Rotation:

```conf
# /etc/logrotate.d/course-content-system
/var/log/course-content-system.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 courseapp courseapp
    sharedscripts
    postrotate
        systemctl restart course-content-system
    endscript
}
```

### Monitoring

1. Add Actuator endpoints for monitoring:

```properties
management.endpoints.web.exposure.include=health,metrics,info
management.endpoint.health.show-details=when_authorized
```

2. Setup monitoring using Prometheus and Grafana (recommended)

### Security Checklist

- [ ] Enable HTTPS only
- [ ] Set secure headers
- [ ] Configure rate limiting
- [ ] Setup WAF
- [ ] Regular security updates
- [ ] Database encryption
- [ ] File upload virus scanning
- [ ] Regular security audits

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

## Development Setup

```bash
docker compose up
```

This will start the application in development mode:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: PostgreSQL on port 5432

## Production Deployment

1. Create a `.env` file with your configuration:

```bash
DB_NAME=coursedb
DB_USER=postgres
DB_PASSWORD=your_secure_password
PORT=80
```

2. Build and run the production containers:

```bash
docker compose -f docker-compose.prod.yml up -d
```

The application will be available at http://localhost (or your configured PORT)

## Architecture

- Frontend: React application served by Create React App's development server
- Backend: Spring Boot REST API
- Database: PostgreSQL
- File Storage: Persistent volume for uploaded files

## Security Notes

- Production deployment uses non-root users in containers
- Database credentials should be changed in production
- All services are contained within a Docker network
- Frontend served through Nginx with proper caching headers
