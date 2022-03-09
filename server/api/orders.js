const router = require("express").Router();
const {
  models: { OrderEntry, Order, User },
} = require("../db");

//all routes start at /api/orders

//if logged in:
//query db for order associated with orderEntries
//increment orderId--create new empty instance of order

router.put("/", async (req, res, next) => {
  try {
    const { id } = await User.findByToken(req.headers.authorization);
    // grab the current user Id and find their associated order that has not been purchased

    console.log("ID order entries post-->", id);
    // if (!id) {
    //   //check if local storage has order object
    //   if (!localStorage.guestOrder) {
    //     localStorage.setItem("guestOrder", []);
    //   }
    //   //create object of orderEntry,
    //   const newlyPlacedGuestOrderEntry = {
    //     size: req.body.size,
    //     colorId: req.body.color,
    //     QTY: req.body.QTY,
    //     productId: req.body.productId,
    //     orderId: -1,
    //   };

    //   //push that object to local storage in an array of order Entries whose order id = -1
    //   localStorage.guestOrder.push(newlyPlacedGuestOrderEntry);
    //   res.send(newlyPlacedGuestOrderEntry);
    // }

    let currentOrder = await Order.findOne({
      where: {
        userId: id,
        purchased: false,
      },
    });
    // console.log('CURRENT ORDER -->', currentOrder.dataValues)

    let currentOrNewOrderId;

    if (!currentOrder) {
      const newOrder = await Order.create({ userId: id });
      currentOrNewOrderId = newOrder.id;
    } else {
      currentOrNewOrderId = currentOrder.id;
    }

    const newlyPlacedOrderEntry = {
      size: req.body.size,
      colorId: req.body.color,
      QTY: req.body.QTY,
      productId: req.body.productId,
      orderId: currentOrNewOrderId,
    };

    //use that object to create a new order entry
    const orderEntry = await OrderEntry.create(newlyPlacedOrderEntry);
    console.log("ORDER ENTRY NEWLY CREATED -->", orderEntry);
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
  } catch (err) {
    next(err);
  }
});

//to make updates to an existng orderEntry
router.put("/:id", async (req, res, next) => {
  try {
    const orderEntry = await OrderEntry.findByPk(req.params.id);
    const updatedOrderEntry = await OrderEntry.update(req.body);
    res.send(updatedOrderEntry);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
