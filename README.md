# Course Content Management System

A comprehensive system for managing and delivering course content, designed for educational institutions and online learning platforms.

## Features

- Upload and manage various content types (PDFs, videos, images)
- Organize content by courses
- User management with role-based access control
- RESTful API for content retrieval
- Modern React frontend for intuitive content management

## Project Structure

This repository is organized as a monorepo containing both frontend and backend code:

- `frontend/`: React application
- `backend/`: Spring Boot application
- `docs/`: Project documentation
- `.github/`: GitHub workflows and templates

## Technology Stack

### Backend

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Security
- Embedded PostgreSQL
- Maven

### Frontend

- React 18
- React Router
- Axios
- Bootstrap/Material UI (TBD)
- NPM/Yarn

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher
- Git

### Development Setup

1. Clone the repository

   ```
   git clone https://github.com/yourusername/course-content-system.git
   cd course-content-system
   ```

2. Start the backend

   ```
   cd backend
   mvn spring-boot:run
   ```

3. Start the frontend

   ```
   cd frontend
   npm install
   npm start
   ```

4. Access the application at `http://localhost:3000`

## API Documentation

API documentation will be available at `/docs/api` once the project is further developed.

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
