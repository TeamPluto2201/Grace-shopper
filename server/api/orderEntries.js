const router = require("express").Router();
const {
  models: { OrderEntry, Order, User },
} = require("../db");


//all routes start at /api/orderEntries

// creating new order Entry 

router.post("/", async (req, res, next) => {
  try {
    // grab the current user Id and find their associated order that has not been purchased
    const { id } = await User.findByToken(req.headers.authorization)
    console.log('ID order entries post-->', id)

    let currentOrder = await Order.findOne({
      where: {
        userId: id,
        purchased: false,
      },
    });
    // console.log('CURRENT ORDER -->', currentOrder.dataValues)

    let currentOrNewOrderId;

    if (!currentOrder) {
      const newOrder = await Order.create({ userId: id })
      currentOrNewOrderId = newOrder.id
    } else {
      currentOrNewOrderId = currentOrder.id
    }
    


    const newlyPlacedOrder = {
      size: req.body.size,
      colorId: req.body.color,
      QTY: req.body.QTY,
      productId: req.body.productId,
      orderId: currentOrNewOrderId,
    };

    console.log('NEWLY PLACED ORDER OBJ inside /api/orderEntries post request--->' , newlyPlacedOrder)

    currentOrder = await Order.findOne({
      where: {
        userId: id,
        purchased: false,
      },
    });

  
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
    const updatedOrderEntry = await OrderEntry.update(req.body);
    res.send(updatedOrderEntry);
  }
  catch (err) {
    next(err)
  }
})

module.exports = router;
