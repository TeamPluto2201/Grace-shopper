const router = require("express").Router();
const {
  models: { OrderEntry, Order, Product, Color, User },
} = require("../db");

//all routes start at /api/cart

//route for getting all the outstanding orderentries to render in a cart for a user.

router.get("/", async (req, res, next) => {
  try {
    if (req.headers.authorization) {

      const user = await User.findByToken(req.headers.authorization)
      const order = await Order.findOne({
        where: {
          userId: user.id,
          purchased: false,
        },
        include: [{
          model: OrderEntry, include: [{ model: Product }, { model: Color }]
        }]
      });
      res.send(order.orderEntries);
    }
  }

  catch (err) {
    next(err);
  }
});


module.exports = router;
