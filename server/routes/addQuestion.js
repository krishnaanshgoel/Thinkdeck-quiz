const express = require('express');
const QuizQuestion = require("../models/QuizQuestion");

const router = express.Router();

router.post("/", async (req, res) => {
  const { question, options, correctAnswer, topictags, difficulty } = req.body;

  // Validate required fields
  if (!question || !options || !correctAnswer || !topictags || !difficulty) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // Validate difficulty field
  const validDifficulties = ["easy", "medium", "hard"];
  if (!validDifficulties.includes(difficulty)) {
    return res.status(400).json({ message: "Invalid difficulty value." });
  }

  try {
    // Create a new question entry
    await QuizQuestion.create({
      question,
      options,
      correctAnswer,
      topictags,
      difficulty,
    });

    res.status(201).json({ message: "Question added successfully." });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
