const User = require('../models/User');
const Product = require('../models/Product');

//route to see the cart
const viewCart = async (req, res) => {
    let user = await User.findById(req.user._id).populate('cart');
    const TotalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    const productInfo = user.cart.map((p) => p.desc).join(',');
    res.render('cart/cart', { user, TotalAmount, productInfo })
};

//Route to add to cart
const addToCart = async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
};

const deleteProduct = async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id;
    await User.findByIdAndUpdate(userId, { $pull: { cart: productId } });
    req.flash('success', 'Product deleted successfully.');
    res.redirect('/user/cart');
};

module.exports = { viewCart, addToCart, deleteProduct };