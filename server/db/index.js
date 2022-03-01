//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const OrderEntry = require("./models/OrderEntry");
const Order = require("./models/Order");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderEntry);
OrderEntry.belongsTo(Order);

module.exports = {
  db,
  models: {
    User,
  },
};
