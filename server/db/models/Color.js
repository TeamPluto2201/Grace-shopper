const Sequelize = require("sequelize");
const db = require("../db");

const Color = db.define("color", {
  name: {
    type: Sequelize.ENUM('white', 'black'),
    allowNull: false,
  }
});

module.exports = Color;
