const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); //mini instance of app
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');
const { showAllProducts, productForm, createProduct, showProduct, editProductForm, updateProduct, deleteProduct } = require('../controllers/product');

//All mongoose methods return a promise. So to avoid promise chaining we use async await functions

//To show all the products
router.get('/products', showAllProducts);

//To show form for new product
router.get('/product/new', isLoggedIn, isSeller, productForm);

//To actually add the product
router.post('/products', validateProduct, isLoggedIn, isSeller, createProduct);

//To show a particular product
router.get('/products/:id', isLoggedIn, showProduct);

//Form to edit a particular product
router.get('/products/:id/edit', isLoggedIn, isProductAuthor, editProductForm);

//To actually edit the data in DB
router.patch('/products/:id', validateProduct, isLoggedIn, isProductAuthor, updateProduct);

//To delete a product
router.delete('/products/:id', isLoggedIn, isProductAuthor, deleteProduct);


module.exports = router;





















