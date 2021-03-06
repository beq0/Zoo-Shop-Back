const router = require('express').Router();
const Product = require('../controllers/product.controller');

router.post('/add', Product.addProduct);

router.post('/change', Product.changeProduct);

router.delete('/delete/:_id', Product.deleteProduct);

router.post('/findProducts', Product.findProducts);

router.get('/findAll', Product.findAll)

router.get('/one', Product.getProduct);

router.post('/sellProduct', Product.sellProduct);

module.exports = router;