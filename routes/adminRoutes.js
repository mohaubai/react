const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const verifyRole = require('../middleware/verifyRole');

const router = new express.Router();

router.post('/admin/signup', adminController.signup);
router.post('/admin/login', adminController.login);

router.get('/admin/products', auth, verifyRole(['admin']), adminController.getProducts);

router.post('/admin/products', auth, verifyRole(['admin']), adminController.addProduct);
router.patch('/admin/products/:productId', auth, verifyRole(['admin']), adminController.editProduct);
router.delete('/admin/products/:productId', auth, verifyRole(['admin']), adminController.deleteProduct);

module.exports = router;
