const Sequelize = require("sequelize");
const db = require("../db");

const OrderEntry = db.define("orderEntry", {
  size: {
    type: Sequelize.ENUM('S', 'M', 'L'),
    allowNull: false,
  },
  QTY: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderEntry;
