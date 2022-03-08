const router = require("express").Router();
const {
  models: { OrderEntry, Order, Product, Color },
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
