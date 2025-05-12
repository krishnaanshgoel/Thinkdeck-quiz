package handlers

import (
    "net/http"
    "thinkdeck-quiz/internal/databases"
    "thinkdeck-quiz/internal/models"

    "github.com/gin-gonic/gin"
)

func GetWrongAnswers(c *gin.Context) {
    userID := c.GetString("userID")
    var wrongAnswers []models.ErrorAnswer

    if err := database.DB.Where("user_id = ?", userID).Find(&wrongAnswers).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching wrong answers"})
        return
    }

    c.JSON(http.StatusOK, wrongAnswers)
}