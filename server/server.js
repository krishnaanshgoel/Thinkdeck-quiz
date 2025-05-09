// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");
const submitRoute = require("./routes/submitAnswer");
const getQuestionRoute = require("./routes/getQuestion");
const addQuestionRoute = require("./routes/addQuestion");
const authRoutes = require("./routes/auth");
// const authRoutes = require("./routes/auth");
const getWrongAnswersRoute = require("./routes/getWrongAnswers");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/add-question", addQuestionRoute);
app.use("/api/submit", submitRoute);
app.use("/api/question", getQuestionRoute);
// app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wrong-answers", getWrongAnswersRoute);

sequelize.sync({ alter: true }).then(() => {
  console.log("PostgreSQL tables created!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
