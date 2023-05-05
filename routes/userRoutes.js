const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const verifyRole = require('../middleware/verifyRole');

const router = new express.Router();

router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
// router.get('/user/profile', auth, verifyRole(['user']), userController.getProfile);
// router.get('/user/products', auth, verifyRole(['user']), userController.getProducts);
router.get('/user/me', auth, verifyRole(['user']), userController.getProfile);
router.get('/user/products', auth, verifyRole(['user']), userController.getProducts);

module.exports = router;
