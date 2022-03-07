const router = require("express").Router();
const {
  models: { OrderEntry, Order, Product },
} = require("../db");

//all routes start at /api/cart

//route for getting all the outstanding orderentries to render in a cart for a user.
router.get("/:userId", async (req, res, next) => {
  try {

    // req.headers.authorization = token
    // const user = await User.findByToken(req.headers.authorization)

    // JOE CR: A .findOne() can be used here if you only expect and want to use one.
    // Which eliminates the need for order[0]
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        purchased: false,
      },
    });
    // JOE CR: This doesn't need to be a separate query, although it's okay.
    // More performant would be eager loading added to the previous query that loads
    // associated OrderEntry and does a *nested* eager load for model: Product
    const cart = await OrderEntry.findAll({
      include: {
        model: Product,
      },
      where: {
        orderId: order[0].id,
      },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

// //try a different approach

// router.get('/:userId', async (req, res, next) => {
//     try {
//         const order = await Order.findAll({
//             where: {
//                 userId: req.params.userId,
//                 purchased: false,
//             },
//         });
//         const cart = await OrderEntry.findAll({
//             include: {
//                 model: Order,
//                 model: Product
//             },
//             where: {
//                 orderId: order[0].id
//             }
//         })
//         res.send(cart)
//     } catch (err) {
//         next(err)
//     }
// });

module.exports = router;
