  const express = require("express");
  const { Op, Sequelize } = require("sequelize");  // Import Sequelize here
  const QuizQuestion = require("../models/QuizQuestion");
  const ErrorAnswer = require("../models/ErrorAnswer");

  const router = express.Router();

  // POST endpoint to filter questions by error topics
  router.post("/", async (req, res) => {
    console.log("Hello from getQuestion.js"); // Log to confirm the route is hit
    try {
      // Fetch distinct error topics from the erroranswers table
      const errorAnswers = await ErrorAnswer.findAll({
        attributes: ["topictags"],
        raw: true,
      });

      // Flatten and deduplicate the topictags array
      const uniqueErrorTopics = [
        ...new Set(errorAnswers.flatMap((entry) => entry.topictags)),
      ];

      console.log(uniqueErrorTopics);

      // Create a frequency map for the topictags in erroranswers
      const frequencyMap = {};

      errorAnswers.forEach((entry) => {
        entry.topictags.forEach((tag) => {
          if (frequencyMap[tag]) {
            frequencyMap[tag] += 1; // Increment frequency count
          } else {
            frequencyMap[tag] = 1; // Initialize with count 1
          }
        });
      });

      // Log the frequency map (you can remove this log later)
      console.log("Topic Frequency Map:", frequencyMap);

      let questions = [];

      if (uniqueErrorTopics.length) {
        // Fetch one question for each unique error topic
        const topicQuestionsPromises = uniqueErrorTopics.map(async (topic) => {
          const question = await QuizQuestion.findOne({
            where: {
              topictags: {
                [Op.contains]: [topic], // Ensure topic is part of topictags array
              },
            },
            order: Sequelize.fn('RANDOM'), // Randomize order
          });
          return question;
        });

        // Resolve all promises and add to the questions array
        const topicQuestions = await Promise.all(topicQuestionsPromises);

        // Filter out null values if no question is found for a topic
        questions = topicQuestions.filter((q) => q !== null);
      }

      // If there are fewer than 20 questions from unique topics, fetch additional random questions
      const additionalQuestionsNeeded = 20 - questions.length;

      if (additionalQuestionsNeeded > 0) {
        const randomQuestions = await QuizQuestion.findAll({
          order: Sequelize.fn('RANDOM'), // Randomize order
          limit: additionalQuestionsNeeded,
        });

        // Merge the questions and ensure no duplicates (based on question ID)
        questions = [
          ...new Map(questions.concat(randomQuestions).map((q) => [q.id, q])).values(),
        ];
      }

      // If there are no questions found, return a 404 error
      if (!questions.length) {
        return res.status(404).json({ message: "No questions found." });
      }

      // Limit to 20 questions if the list exceeds that
      questions = questions.slice(0, 20);

      res.json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  });

  module.exports = router;


