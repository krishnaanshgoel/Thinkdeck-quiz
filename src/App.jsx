import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import QuizForm from "./components/QuizForm";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import './app.css';
import './components/QuizForm.css';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <div style={{ padding: 40 }}>
        <h1>Quiz App</h1>
        {user && (
          <div style={{ marginBottom: 20 }}>
            <span>Logged in as: <strong>{user.name}</strong></span>
            <button onClick={() => setUser(null)} style={{ marginLeft: 10 }}>
              Logout
            </button>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/quiz" /> : <LoginForm setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/quiz" /> : <SignupForm setUser={setUser} />}
          />
          <Route
            path="/quiz"
            element={user ? <QuizForm user={user} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
