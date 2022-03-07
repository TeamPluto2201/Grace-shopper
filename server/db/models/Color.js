const Sequelize = require("sequelize");
const db = require("../db");

const Color = db.define("color", {
  name: {
    // JOE CR: I like that Color is a separate table now, but using an ENUM here removes
    // most of the reason why one would make it a separate table.
    type: Sequelize.ENUM('white', 'black'),
    allowNull: false,
  }
});

module.exports = Color;
