# Course Content Management System

A comprehensive course content management system for educational institutions, featuring secure file storage, role-based access control, and an intuitive React frontend.

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

- Java 17
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

- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 13 or higher
- Maven 3.6 or higher

### Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/course-content-manager.git
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Ravidu Liyanage - _Initial work_
