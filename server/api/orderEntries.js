const router = require("express").Router();
const {
    models: { OrderEntry },
} = require("../db");

router.post("/", async (req, res, next) => {
    try {
        console.log("REQ.BODY**********************", req.body)
        const orderEntry = await OrderEntry.create(req.body);
        res.send(orderEntry);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
