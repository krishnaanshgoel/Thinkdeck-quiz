const express = require("express");
const ErrorAnswer = require("../models/ErrorAnswer");

const router = express.Router();

// GET /api/wrong-answers/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId parameter." });
  }

  try {
    const wrongAnswers = await ErrorAnswer.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]], // Optional: show most recent first
    });

    res.json(wrongAnswers);
  } catch (err) {
    console.error("Error fetching wrong answers:", err);
    res.status(500).json({ message: "Server error while fetching wrong answers." });
  }
});

module.exports = router;
