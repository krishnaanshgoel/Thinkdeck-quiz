import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuizForm.css"; // Make sure this CSS is in the same folder or update the path

export default function QuizForm({ user }) {
  const [id, setId] = useState(1); // Initialize id state
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const errorTopics = []; // optional
        const res = await axios.post("http://localhost:5000/api/question", { errorTopics });
        setQuestionData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching questions");
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);
// if betty is here ,then we are here 
  const handleNext = async () => {
    const currentQuestion = questionData[currentQuestionIndex];

    try {
      await axios.post("http://localhost:5000/api/submit", {

        question: currentQuestion.question,
        userAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        userId: user.userId,
        topictags: currentQuestion.topictags,
        difficulty: currentQuestion.difficulty,
      });

      setFeedback("Answer saved!");

      if (currentQuestionIndex < questionData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer("");
        setFeedback("");
      } else {
        setIsQuizComplete(true);
      }
    } catch (err) {
      setFeedback("Error submitting answer.");
    }
  };

  const handleSubmit = async () => {
    try {
      const currentQuestion = questionData[currentQuestionIndex];
      if (userAnswer) {
        await axios.post("http://localhost:5000/api/submit", {
          question: currentQuestion.question,
          userAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          userId: user.userId,
          topictags: currentQuestion.topictags,
          difficulty: currentQuestion.difficulty,
        });
      }

      setIsQuizComplete(true);
      setFeedback("Quiz submitted successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      setFeedback("Error submitting quiz.");
    }
  };

  if (isLoading) return <p className="quiz-container">Loading questions...</p>;
  if (!questionData.length) return <p className="quiz-container">No questions available.</p>;

  const currentQuestion = questionData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="user-info">
        <h3>Welcome, {user.name || "User"}!</h3>
      </div>
  
      <div className="question-area">
        <h3>
          Question {currentQuestionIndex + 1} of {questionData.length}
        </h3>
        <h4>{currentQuestion.question}</h4>
  
        <div className="options">
          {currentQuestion.options?.map((option, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={userAnswer === option}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
  
        <div className="buttons">
          {!isQuizComplete && (
            <>
              <button
                onClick={handleNext}
                disabled={!userAnswer || currentQuestionIndex === questionData.length - 1}
              >
                Next
              </button>
              {currentQuestionIndex === questionData.length - 1 && (
                <button onClick={handleSubmit}>Submit Quiz</button>
              )}
            </>
          )}
        </div>
  
        {isQuizComplete && (
          <div className="success-message">🎉 You have completed the quiz!</div>
        )}
  
        {feedback && <div className="feedback">{feedback}</div>}
      </div>
    </div>
  );
  
}
