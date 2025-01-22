const Product = require('../models/Product');

//All mongoose methods return a promise. So to avoid promise chaining we use async await functions

//To show all the products
const showAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('./products/index', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

//To show form for new product
const productForm = (req, res) => {
    try {
        res.render('products/new');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

//To actually add the product
const createProduct = async (req, res) => {
    try {
        let { name, price, img, desc } = req.body;
        await Product.create({ name, price, img, desc, author: req.user._id });
        req.flash('success', 'Product added successfully.');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

//To show a particular product
const showProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg: req.flash('msg') });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

//Form to edit a particular product
const editProductForm = async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

//To actually edit the data in DB
const updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        req.flash('success', 'Product edited successfully.');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

//To delete a product
const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findById(id);
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully.');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};


module.exports = { showAllProducts, productForm, createProduct, showProduct, editProductForm, updateProduct, deleteProduct }





















