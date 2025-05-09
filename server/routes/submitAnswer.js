const express = require("express");
const RightAnswer = require("../models/RightAnswer");
const ErrorAnswer = require("../models/ErrorAnswer");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received answer submission:", req.body);

  const { question, userAnswer, correctAnswer, userId, topictags, difficulty } = req.body;

  if (!question || !userAnswer || !correctAnswer || !userId || !topictags || !difficulty) {
    console.warn("Missing fields!", req.body);
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const answerData = {
      question,
      userAnswer,
      correctAnswer,
      userId,
      topictags,
      difficulty,
    };

    const isCorrect =
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      // Check if question exists in ErrorAnswer
      console.log("Correct answer submitted:", answerData.userAnswer);
      const existingError = await ErrorAnswer.findOne({
        where: { question, userId },
      });

      if (existingError) {
        console.log("found in ErrorAnswer, removing it now...");
        await existingError.destroy(); // Remove from erroranswers
        console.log("Removed from ErrorAnswer");
      }

      await RightAnswer.create(answerData); // Add to rightanswers
      console.log("Saved to RightAnswer");
      res.json({ message: "Correct! Moved to right DB." });
    } else {
      await ErrorAnswer.create(answerData); // Add to erroranswers
      console.log("Saved to ErrorAnswer");
      res.json({ message: "Wrong! Saved to error DB." });
    }
  } catch (err) {
    console.error("Error saving answer:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
