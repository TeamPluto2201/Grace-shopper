const router = require('express').Router();
const Product = 'TBD PRODUCT MODEL';

router.get('/', async (req, res, next) => {
  try {
    // const products = await Product.findAll()  
    res.send('Howdy, it is all the products!!!')
  } catch(err) {
      next(err)
  }
});

module.exports = router;