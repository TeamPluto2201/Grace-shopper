const Sequelize = require("sequelize");
const db = require("../db");

const OrderEntry = db.define("orderEntry", {
  Size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  QTY: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderEntry;
