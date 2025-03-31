-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    version BIGINT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role VARCHAR(20) NOT NULL,
    CONSTRAINT chk_user_role CHECK (role IN ('ROLE_STUDENT', 'ROLE_INSTRUCTOR', 'ROLE_ADMIN'))
);

-- Courses table
CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    version BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    course_code VARCHAR(20) NOT NULL,
    instructor_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    CONSTRAINT chk_course_status CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

-- Course enrollments
CREATE TABLE course_enrollments (
    user_id BIGINT REFERENCES users(id),
    course_id BIGINT REFERENCES courses(id),
    PRIMARY KEY (user_id, course_id)
);

-- Content table
CREATE TABLE content (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    version BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    file_path VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    file_size BIGINT NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    course_id BIGINT NOT NULL REFERENCES courses(id),
    uploaded_by_id BIGINT REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    display_order INTEGER,
    CONSTRAINT chk_content_status CHECK (status IN ('ACTIVE', 'ARCHIVED', 'DELETED')),
    CONSTRAINT chk_file_type CHECK (file_type IN ('PDF', 'VIDEO', 'IMAGE'))
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_content_course ON content(course_id);
CREATE INDEX idx_content_uploader ON content(uploaded_by_id);
