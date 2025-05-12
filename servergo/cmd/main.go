package main

import (
    "log"
    "os"
    "thinkdeck-quiz/internal/databases"
    "thinkdeck-quiz/internal/handlers"
    "thinkdeck-quiz/internal/middleware"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Fatal("Error loading .env file")
    }

    // Initialize database
    db, err := databases.InitDB()
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    // Initialize router
    r := gin.Default()

    // CORS middleware
    r.Use(middleware.CORS())

    // Public routes
    r.POST("/api/auth/register", handlers.Register)
    r.POST("/api/auth/login", handlers.Login)

    // Protected routes
    protected := r.Group("/api")
    protected.Use(middleware.AuthMiddleware())
    {
        protected.POST("/add-question", handlers.AddQuestion)
        protected.GET("/question", handlers.GetQuestion)
        protected.POST("/submit", handlers.SubmitAnswer)
        protected.GET("/wrong-answers", handlers.GetWrongAnswers)
    }

    // Start server
    port := os.Getenv("PORT")
    if port == "" {
        port = "5001"
    }
    r.Run(":" + port)
}