//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const OrderEntry = require("./models/OrderEntry");
const Order = require("./models/Order");
const Product = require("./models/Product");
const Color = require("./models/Color")

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(OrderEntry);
OrderEntry.belongsTo(Order);
// Product.belongsToMany(OrderEntry, { through: 'Product_OrderEntry' })
// OrderEntry.belongsToMany(Product, { through: 'Product_OrderEntry' })

OrderEntry.belongsTo(Product);
Product.hasMany(OrderEntry);

OrderEntry.belongsTo(Color);
Color.hasMany(OrderEntry)

module.exports = {
  db,
  models: {
    User,
    Order,
    OrderEntry,
    Product,
    Color
  },
};
