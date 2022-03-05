const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  garmentType: {
    type: Sequelize.ENUM('T - Shirt'),
    defaultValue: "T - Shirt"
  },
  designName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imgPath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
