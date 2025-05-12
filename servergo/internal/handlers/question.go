package handlers

import (
    "net/http"
    "thinkdeck-quiz/internal/databases"
    "thinkdeck-quiz/internal/models"

    "github.com/gin-gonic/gin"
)

func AddQuestion(c *gin.Context) {
    var question models.QuizQuestion
    if err := c.ShouldBindJSON(&question); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := databases.DB.Create(&question).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating question"})
        return
    }

    c.JSON(http.StatusCreated, question)
}

func GetQuestion(c *gin.Context) {
    var questions []models.QuizQuestion
    query := databases.DB.Model(&models.QuizQuestion{})

    // Apply filters if provided
    if difficulty := c.Query("difficulty"); difficulty != "" {
        query = query.Where("difficulty = ?", difficulty)
    }
    if topic := c.Query("topic"); topic != "" {
        query = query.Where("? = ANY(topictags)", topic)
    }

    if err := query.Find(&questions).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching questions"})
        return
    }

    c.JSON(http.StatusOK, questions)
}