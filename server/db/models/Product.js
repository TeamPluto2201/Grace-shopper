const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("user", {
  garmentType: {
    type: Sequelize.STRING,
    defaulValue: T - Shirt,
    allowNull: false,
  },
  designName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  designName: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imgPath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//git troubleshooting

module.exports = Product;
