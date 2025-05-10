# ThinkDeck Backend Server Documentation

## Quick Reference Guide

| Section               | Description                                        | Link                                                     |
| --------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| Setup & Configuration | How to install and run the server                  | [Setup Instructions](#1-how-to-start-and-run-the-server) |
| API Endpoints         | Complete list of API endpoints and their responses | [API Documentation](#2-api-endpoints)                    |

## 1. How to Start and Run the Server

To start and run the ThinkDeck backend server, follow these steps:

### Prerequisites

-   Ensure you have Node.js and npm installed on your machine.
-   You need to have PostgreSQL installed and running.

### Setup Instructions

1. **Clone the Repository**: Clone the repository to your local machine.
2. **Navigate to the Server Directory**:
    ```
    cd ThinkDeck_Quiz/server
    ```
3. **Install Dependencies**: Run the following command to install the required dependencies:
    ```
    npm install
    ```
4. **Create a `.env` File**: Create a `.env` file in the `server` directory and add the following environment variable:

    ```
    PG_URI=your_postgresql_connection_string
    PORT=5000
    ```

    Replace `your_postgresql_connection_string` with your actual PostgreSQL connection string.

5. **Start the Server**: Use the following command to start the server:
    ```
    npm start
    ```
6. **Access the Server**: The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

## 2. API Endpoints

| Endpoint                     | Method | Request Body                                                             | Response                                                                                   |
| ---------------------------- | ------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `/api/auth/signup`           | POST   | `{ name, email, password }`                                              | `{ message: "Signup successful", userId }`                                                 |
| `/api/auth/login`            | POST   | `{ email, password }`                                                    | `{ message: "Login successful", userId, name }`                                            |
| `/api/add-question`          | POST   | `{ question, options, correctAnswer, topictags, difficulty }`            | `{ message: "Question added successfully." }`                                              |
| `/api/submit`                | POST   | `{ question, userAnswer, correctAnswer, userId, topictags, difficulty }` | `{ message: "Correct! Moved to right DB." }` or `{ message: "Wrong! Saved to error DB." }` |
| `/api/question`              | POST   | `{ errorTopics: [] }` (optional)                                         | Array of question objects                                                                  |
| `/api/wrong-answers/:userId` | GET    | None (userId in URL param)                                               | Array of error answer objects                                                              |

### Request/Response Details

#### Authentication Endpoints

**POST `/api/auth/signup`**

-   **Purpose**: Register a new user
-   **Request Body**:
    ```json
    {
    	"name": "User Name",
    	"email": "user@example.com",
    	"password": "securepassword"
    }
    ```
-   **Response**:
    ```json
    {
    	"message": "Signup successful",
    	"userId": "123"
    }
    ```

**POST `/api/auth/login`**

-   **Purpose**: Authenticate a user
-   **Request Body**:
    ```json
    {
    	"email": "user@example.com",
    	"password": "securepassword"
    }
    ```
-   **Response**:
    ```json
    {
    	"message": "Login successful",
    	"userId": "123",
    	"name": "User Name"
    }
    ```

#### Question Management Endpoints

**POST `/api/add-question`**

-   **Purpose**: Add a new quiz question
-   **Request Body**:
    ```json
    {
    	"question": "What is the capital of France?",
    	"options": ["London", "Berlin", "Paris", "Madrid"],
    	"correctAnswer": "Paris",
    	"topictags": ["Geography", "Europe", "Capitals"],
    	"difficulty": "easy"
    }
    ```
-   **Response**:
    ```json
    {
    	"message": "Question added successfully."
    }
    ```

**POST `/api/question`**

-   **Purpose**: Fetch quiz questions (prioritizing topics where users made errors)
-   **Request Body** (optional):
    ```json
    {
    	"errorTopics": ["Arrays", "Functions"]
    }
    ```
-   **Response**: Array of question objects
    ```json
    [
    	{
    		"id": 1,
    		"question": "What is the capital of France?",
    		"options": ["London", "Berlin", "Paris", "Madrid"],
    		"correctAnswer": "Paris",
    		"topictags": ["Geography", "Europe", "Capitals"],
    		"difficulty": "easy"
    	}
    	// More questions...
    ]
    ```

#### Answer Submission Endpoints

**POST `/api/submit`**

-   **Purpose**: Submit an answer for a quiz question
-   **Request Body**:
    ```json
    {
    	"question": "What is the capital of France?",
    	"userAnswer": "Paris",
    	"correctAnswer": "Paris",
    	"userId": "123",
    	"topictags": ["Geography", "Europe", "Capitals"],
    	"difficulty": "easy"
    }
    ```
-   **Response** (correct answer):
    ```json
    {
    	"message": "Correct! Moved to right DB."
    }
    ```
-   **Response** (wrong answer):
    ```json
    {
    	"message": "Wrong! Saved to error DB."
    }
    ```

**GET `/api/wrong-answers/:userId`**

-   **Purpose**: Retrieve wrong answers for a specific user
-   **URL Parameter**: `userId` - The ID of the user
-   **Response**: Array of error answer objects
    ```json
    [
    	{
    		"id": 1,
    		"question": "What is the capital of Germany?",
    		"userAnswer": "Munich",
    		"correctAnswer": "Berlin",
    		"userId": "123",
    		"topictags": ["Geography", "Europe", "Capitals"],
    		"difficulty": "easy",
    		"createdAt": "2023-05-20T14:30:00.000Z"
    	}
    	// More error answers...
    ]
    ```

This documentation provides an overview of how to set up and interact with the ThinkDeck backend server.
