# ThinkDeck Quiz Backend Architecture Documentation

## 1. System Overview
The ThinkDeck Quiz backend is a Go-based RESTful API service that manages quiz questions, user answers, and authentication. It follows a layered architecture pattern with clear separation of concerns and modular design.

## 2. Technology Stack
- **Programming Language**: Go (Golang)
- **Web Framework**: Gin
- **Database**: PostgreSQL
- **ORM**: GORM
- **Authentication**: JWT (JSON Web Tokens)
- **Configuration**: Environment Variables
- **API Documentation**: Swagger/OpenAPI

## 3. System Architecture

### 3.1 Core Components

#### API Layer
- Entry point for all HTTP requests
- Handles request routing and middleware
- Implements RESTful API endpoints
- Manages CORS and security headers

#### Authentication System
- JWT-based authentication
- Password hashing using bcrypt
- User registration and login
- Token validation and refresh
- Protected route middleware

#### Quiz Management
- Question creation and retrieval
- Answer submission and validation
- Wrong answers tracking
- Topic-based question filtering
- Difficulty level management

#### Database Layer
- PostgreSQL database connection
- GORM for object-relational mapping
- Automatic schema migrations
- Data validation and constraints
- Relationship management

#### Configuration Management
- Environment-based configuration
- Database connection settings
- JWT secret management
- Server port and host settings
- Logging configuration

### 3.2 Data Models

#### User Model
```go
type User struct {
    ID        uint      `json:"id" gorm:"primaryKey"`
    Username  string    `json:"username"`
    Password  string    `json:"-"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}
```

#### Quiz Question Model
```go
type QuizQuestion struct {
    ID            uint      `json:"id" gorm:"primaryKey"`
    Question      string    `json:"question"`
    CorrectAnswer string    `json:"correct_answer"`
    TopicTags     []string  `json:"topic_tags"`
    Difficulty    string    `json:"difficulty"`
    CreatedAt     time.Time `json:"created_at"`
    UpdatedAt     time.Time `json:"updated_at"`
}
```

#### Right Answer Model
```go
type RightAnswers struct {
    ID         uint      `json:"id" gorm:"primaryKey"`
    UserID     uint      `json:"user_id"`
    QuestionID uint      `json:"question_id"`
    Answer     string    `json:"answer"`
    CreatedAt  time.Time `json:"created_at"`
    UpdatedAt  time.Time `json:"updated_at"`
}
```

#### Error Answer Model
```go
type ErrorAnswers struct {
    ID            uint      `json:"id" gorm:"primaryKey"`
    UserID        uint      `json:"user_id"`
    QuestionID    uint      `json:"question_id"`
    UserAnswer    string    `json:"user_answer"`
    CorrectAnswer string    `json:"correct_answer"`
    CreatedAt     time.Time `json:"created_at"`
    UpdatedAt     time.Time `json:"updated_at"`
}
```

## 4. API Endpoints

### 4.1 Public Routes
- **POST /api/auth/register**
  - Register new user
  - Validate user input
  - Hash password
  - Create user record

- **POST /api/auth/login**
  - Authenticate user
  - Validate credentials
  - Generate JWT token
  - Return user data

### 4.2 Protected Routes
- **POST /api/add-question**
  - Add new quiz question
  - Validate question data
  - Store in database

- **GET /api/question**
  - Retrieve questions
  - Filter by topic/difficulty
  - Pagination support

- **POST /api/submit**
  - Submit answer
  - Validate answer
  - Store result
  - Return feedback

- **GET /api/wrong-answers**
  - Get user's wrong answers
  - Filter by date/topic
  - Include correct answers

## 5. Security Measures

### 5.1 Authentication
- JWT token-based authentication
- Token expiration and refresh
- Secure password storage
- Input validation

### 5.2 Data Protection
- Password hashing with bcrypt
- HTTPS enforcement
- CORS configuration
- SQL injection prevention

### 5.3 Environment Security
- Environment variable usage
- Secret management
- Database credentials
- API keys

## 6. Database Design

### 6.1 Schema
- Normalized database design
- Proper indexing
- Foreign key constraints
- Timestamp tracking

### 6.2 Relationships
- User to Answers (One-to-Many)
- Question to Answers (One-to-Many)
- Topic to Questions (Many-to-Many)

## 7. Error Handling

### 7.1 HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### 7.2 Error Responses
- Consistent error format
- Detailed error messages
- Validation errors
- Database errors

## 8. Performance Considerations

### 8.1 Database Optimization
- Proper indexing
- Query optimization
- Connection pooling
- Caching strategy

### 8.2 API Optimization
- Response compression
- Pagination
- Rate limiting
- Caching headers

## 9. Development Guidelines

### 9.1 Code Organization
- Clear directory structure
- Modular design
- Dependency injection
- Interface-based design

### 9.2 Best Practices
- Go standard formatting
- Error handling
- Logging
- Documentation
- Testing

## 10. Deployment

### 10.1 Requirements
- Go 1.16 or higher
- PostgreSQL 12 or higher
- Environment variables
- SSL certificates

### 10.2 Configuration
- Database connection
- Server settings
- Security settings
- Logging configuration

## 11. Monitoring and Logging

### 11.1 Logging
- Request logging
- Error logging
- Performance metrics
- Security events

### 11.2 Monitoring
- Server health
- Database performance
- API metrics
- Error rates

## 12. Future Considerations

### 12.1 Scalability
- Horizontal scaling
- Load balancing
- Database sharding
- Caching strategy

### 12.2 Features
- User roles
- Analytics
- Reporting
- API versioning