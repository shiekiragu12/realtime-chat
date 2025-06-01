const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "realtimeChat",
  username: "postgres",
  password: "asdfghjkl",
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
