const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RightAnswer = sequelize.define("RightAnswer", {
  question: DataTypes.TEXT,
  userAnswer: DataTypes.STRING,
  correctAnswer: DataTypes.STRING,
  userId: DataTypes.STRING,
  topictags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  difficulty: { type: DataTypes.STRING, allowNull: false },
},
  {
    tableName: "rightanswers",
  }
);

module.exports = RightAnswer;
