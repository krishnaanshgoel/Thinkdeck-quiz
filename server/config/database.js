  const { Sequelize } = require("sequelize");
  const dotenv = require("dotenv");
  dotenv.config();
  const PG_URI = process.env.PG_URI;

  if (!PG_URI) {
    throw new Error("PG_URI is not defined in the environment variables.");
  }

  // console.log(PG_URI);

  const sequelize = new Sequelize(PG_URI, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Accept self-signed cert
      },
    },
  });

  module.exports = sequelize;
