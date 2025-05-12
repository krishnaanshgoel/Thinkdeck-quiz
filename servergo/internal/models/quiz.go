package models

import (
    "gorm.io/gorm"
)

type QuizQuestion struct {
    gorm.Model
    Question      string   `gorm:"type:text;not null"`
    Options       []string `gorm:"type:text[];not null"`
    CorrectAnswer string   `gorm:"not null"`
    TopicTags     []string `gorm:"type:text[];not null"`
    Difficulty    string   `gorm:"not null"`
}

type RightAnswer struct {
    gorm.Model
    Question      string   `gorm:"type:text"`
    UserAnswer    string
    CorrectAnswer string
    UserID        string
    TopicTags     []string `gorm:"type:text[];not null"`
    Difficulty    string   `gorm:"not null"`
}

type ErrorAnswer struct {
    gorm.Model
    Question      string   `gorm:"type:text"`
    UserAnswer    string
    CorrectAnswer string
    UserID        string
    TopicTags     []string `gorm:"type:text[];not null"`
    Difficulty    string   `gorm:"not null"`
}