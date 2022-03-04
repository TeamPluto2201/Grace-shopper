const router = require("express").Router();
const {
    models: { OrderEntry, Order },
} = require("../db");

router.post("/", async (req, res, next) => {
    try {
        // grab the current user Id and find their associated order that has not been purchased
        const currentUserId = req.body.userId
        const currentOrder = await Order.findAll({
            where: {
                userId: currentUserId,
                purchased: false
            }
        })
        // create a new object that includes the req.body
        // key/value pairs, subtracts the userId key, and adds the ID from the current order
        const newlyPlacedOrder = {
            size: req.body.size,
            color: req.body.color,
            QTY: req.body.QTY,
            productId: req.body.productId,
            orderId: currentOrder[0].dataValues.id
        }
        //use that object to create a new order entry
        const orderEntry = await OrderEntry.create(newlyPlacedOrder);
        console.log(orderEntry)
        res.send(orderEntry);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
