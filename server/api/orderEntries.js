const router = require("express").Router();
const {
  models: { OrderEntry, Order },
} = require("../db");

router.post("/", async (req, res, next) => {
  try {
    // grab the current user Id and find their associated order that has not been purchased
    const currentUserId = req.body.userId;
    const currentOrder = await Order.findAll({
      where: {
        userId: currentUserId,
        purchased: false,
      },
    });

    /*
        we need to add logic to check if there actually is an order. If not, 
         create a new one
         if (currentOrder.length = 0) {
         Order.create({UserId})
        }
       we then need to requery the database to grab the Id of the order that was just created
        */

    // create a new object that includes the req.body
    // key/value pairs, subtracts the userId key, and adds the ID from the current order
    const newlyPlacedOrder = {
      size: req.body.size,
      color: req.body.color,
      QTY: req.body.QTY,
      productId: req.body.productId,
      orderId: currentOrder[0].dataValues.id,
    };
    //use that object to create a new order entry
    const orderEntry = await OrderEntry.create(newlyPlacedOrder);
    res.send(orderEntry);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
