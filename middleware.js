const Product = require("./models/Product");
const { productSchema, reviewSchema } = require("./schema");


const validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });
    if (error) {
        return res.render('error');
    }
    next();
}

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.render('error');
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please Login first');
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req, res, next) => {
    if (!req.user.role) {
        req.flash('error', 'You do not have the permission to do that ');
        return res.redirect('/products');
    }
    else if (req.user.role !== 'seller') {
        req.flash('error', 'You do not have the permission to do that ');
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async (req, res, next) => {
    let { id } = req.params;  // product id
    let product = await Product.findById(id);  // fetch product by ID

    // Check if the product exists
    if (!product) {
        req.flash('error', 'Product not found');
        return res.redirect('/products');
    }

    // Check if the author exists and compare
    if (!product.author || !product.author.equals(req.user._id)) {
        req.flash('error', 'You are not the authorized user.');
        return res.redirect('/products');
    }

    next();  // continue if the author is correct
};


module.exports = { isLoggedIn, validateProduct, validateReview, isSeller, isProductAuthor };