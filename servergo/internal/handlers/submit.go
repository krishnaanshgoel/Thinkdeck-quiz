package handlers

import (
	"net/http"
	"strconv"
	"thinkdeck-quiz/internal/databases"
	"thinkdeck-quiz/internal/models"

	"github.com/gin-gonic/gin"
)

func SubmitAnswer(c *gin.Context) {
	var submission struct {
		QuestionID    uint     `json:"questionId"`
		UserAnswer    string   `json:"userAnswer"`
		CorrectAnswer string   `json:"correctAnswer"`
		TopicTags     []string `json:"topictags"`
		Difficulty    string   `json:"difficulty"`
	}

	if err := c.ShouldBindJSON(&submission); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDStr := c.GetString("userID")
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	isCorrect := submission.UserAnswer == submission.CorrectAnswer

	if isCorrect {
		rightAnswer := models.RightAnswers{
			QuestionID: submission.QuestionID,
			UserID:     uint(userID),
			Answer:     submission.UserAnswer,
		}
		databases.DB.Create(&rightAnswer)
	} else {
		errorAnswer := models.ErrorAnswers{
			QuestionID:    submission.QuestionID,
			UserID:        uint(userID),
			UserAnswer:    submission.UserAnswer,
			CorrectAnswer: submission.CorrectAnswer,
		}
		databases.DB.Create(&errorAnswer)
	}

	c.JSON(http.StatusOK, gin.H{"correct": isCorrect})
}
