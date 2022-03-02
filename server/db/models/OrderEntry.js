const Sequelize = require("sequelize");
const db = require("../db");

const OrderEntry = db.define("orderEntry", {
  size: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [
        ['S', 'M', 'L'],
      ]
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [
        ['white', 'black'],
      ]
    }
  },
  QTY: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderEntry;
