const router = require("express").Router();
const {
  models: { OrderEntry, Order },
} = require("../db");

//all routes start at /api/orderEntries

// creating new order Entry 

router.post("/", async (req, res, next) => {
  try {
    // grab the current user Id and find their associated order that has not been purchased

    // JOE CR: This is better determined through sending a logged-in user's token through the headers.
    // This is pretty insecure right now in that any one making this request can decide to include--
    // in the body--someone else's userId.
    const currentUserId = req.body.userId;

    let currentOrder = await Order.findAll({
      where: {
        userId: currentUserId,
        purchased: false,
      },
    });

    if (currentOrder.length === 0) {
      const newOrder = { userId: currentUserId }
      // JOE CR: currentOrder can be reassigned on this line instead of doing another
      // query afterwards.
      await Order.create(newOrder)
    }

    // JOE CR: findOne
    currentOrder = await Order.findAll({
      where: {
        userId: currentUserId,
        purchased: false,
      },
    });
    /* we need to add logic to check if there actually is an order. If not, create a new one
         if (currentOrder.length = 0) {
         Order.create({UserId})
        }
       we then need to requery the database to grab the Id of the order that was just created
        */
    // create a new object that includes the req.body
    // key/value pairs, subtracts the userId key, and adds the ID from the current order

    const newlyPlacedOrder = {
      size: req.body.size,
      // JOE CR: Should this be colorId since it's a foreign key now?
      color: req.body.color,
      QTY: req.body.QTY,
      productId: req.body.productId,
      // JOE CR: dataValues is not necessary to include here, although it is misleading when
      // you console.log a Sequelize model instance. You can just do currentOrder[0].id
      orderId: currentOrder[0].dataValues.id,
    };
    //use that object to create a new order entry
    const orderEntry = await OrderEntry.create(newlyPlacedOrder);
    res.send(orderEntry);
  } catch (err) {
    next(err);
  }
});

//to delete an existing orderEntry 
router.delete("/:id", async (req, res, next) => {
  try {
    const orderEntry = await OrderEntry.findByPk(req.params.id);
    await orderEntry.destroy();
    res.send(orderEntry);
  }
  catch (err) {
    next(err)
  }
})

//to make updates to an existng orderEntry  
router.put("/:id", async (req, res, next) => {
  try {
    const orderEntry = await OrderEntry.findByPk(req.params.id);
    // JOE CR: Does this work currently? I imagine this might be updating every order entry in the database right now.
    const updatedOrderEntry = await OrderEntry.update(req.body);
    res.send(updatedOrderEntry);
  }
  catch (err) {
    next(err)
  }
})

module.exports = router;
