const router = require('express').Router();
const { models: { OrderEntry, Order }} = require('../db');
const Product = 'INSERT PRODUCT MODEL';


// Assume for now we have an Order-entry model

router.get('/:orderId', async(req, res, next) => {
    // Our thinking is that the orderId will be in the route path and since there is only
    // one user associated with a given order, we'll pick up the order items from the 
    // Order-entry model (hence line 18).
    try {
        const cart = await OrderEntry.findAll({
            include: {
                model: Order,
            },
            where: {
                orderId: req.params.orderId,
            }
        })
        res.send(cart)
    } catch(err) {
        next(err)
    }
});

module.exports = router;