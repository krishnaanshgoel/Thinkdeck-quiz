package models

import (
	"time"
)

type ErrorAnswers struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id"`
	QuestionID uint     `json:"question_id"`
	UserAnswer string   `json:"user_answer"`
	CorrectAnswer string `json:"correct_answer"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
