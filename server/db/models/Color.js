const Sequelize = require("sequelize");
const db = require("../db");

const Color = db.define("color", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Color;
