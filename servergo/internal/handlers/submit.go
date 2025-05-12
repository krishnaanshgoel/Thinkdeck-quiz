package handlers

import (
    "net/http"
    // "thinkdeck-quiz/internal/databases"
    "thinkdeck-quiz/internal/models"

    "github.com/gin-gonic/gin"
)

func SubmitAnswer(c *gin.Context) {
    var submission struct {
        QuestionID   uint   `json:"questionId"`
        UserAnswer   string `json:"userAnswer"`
        CorrectAnswer string `json:"correctAnswer"`
        TopicTags    []string `json:"topictags"`
        Difficulty   string `json:"difficulty"`
    }

    if err := c.ShouldBindJSON(&submission); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    userID := c.GetString("userID")
    isCorrect := submission.UserAnswer == submission.CorrectAnswer

    if isCorrect {
        rightAnswer := models.RightAnswer{
            Question:      submission.QuestionID,
            UserAnswer:    submission.UserAnswer,
            CorrectAnswer: submission.CorrectAnswer,
            UserID:        userID,
            TopicTags:     submission.TopicTags,
            Difficulty:    submission.Difficulty,
        }
        database.DB.Create(&rightAnswer)
    } else {
        errorAnswer := models.ErrorAnswer{
            Question:      submission.QuestionID,
            UserAnswer:    submission.UserAnswer,
            CorrectAnswer: submission.CorrectAnswer,
            UserID:        userID,
            TopicTags:     submission.TopicTags,
            Difficulty:    submission.Difficulty,
        }
        database.DB.Create(&errorAnswer)
    }

    c.JSON(http.StatusOK, gin.H{"correct": isCorrect})
}