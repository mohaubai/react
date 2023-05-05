const express = require('express');
const customerController = require('../controllers/customerController');
const auth = require('../middleware/auth');
const verifyRole = require('../middleware/verifyRole');

const router = new express.Router();

router.get('/customer/products', auth, verifyRole(['customer']), customerController.getProducts);
router.post('/customer/cart', auth, verifyRole(['customer']), customerController.addToCart);
router.get('/customer/:id', auth, verifyRole(['admin']), customerController.getUser);

module.exports = router;
