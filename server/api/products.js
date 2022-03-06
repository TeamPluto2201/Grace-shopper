const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log('inside POST request...')
    const productToCreate = await Product.create(req.body);
    res.send(productToCreate);
  } catch(err) {
    console.log("Error inside POST request:", err)
    next(err);
  };
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    console.log("here!>>", product);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    await productToDelete.destroy();
    res.send(productToDelete);
  } catch(err) {
    next(err);
  };
});

module.exports = router;
