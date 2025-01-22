const express = require('express');
const router = express.Router()
const { isLoggedIn } = require('../middleware');
const { viewCart, addToCart, deleteProduct } = require('../controllers/cart');

//route to see the cart
router.get('/user/cart', isLoggedIn, viewCart);

//route to add items in cart
router.post('/user/:productId/add', isLoggedIn, addToCart);

//route to delete item in cart
router.delete('/user/:productId/delete', isLoggedIn, deleteProduct);

module.exports = router;