const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const QuizQuestion = sequelize.define("QuizQuestion", {
  question: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  correctAnswer: { type: DataTypes.STRING, allowNull: false },
  topictags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  difficulty: { type: DataTypes.STRING, allowNull: false },
},
  {
    tableName: "quizquestions"
  }
);

module.exports = QuizQuestion;
