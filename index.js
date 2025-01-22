process.removeAllListeners('warning');
// if (process.env.NODE_ENV !== 'production') {
require("dotenv").config();
// }

const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const path = require('path');
const seedDB = require('./seed');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');


// mongoose.connect('mongodb://127.0.0.1:27017/shoppingApp')
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('DB Connected.');
    })
    .catch((err) => {
        console.log('DB Error.', err);
    })

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        Expires: Date.now() + 24 * 7 * 60 * 60 * 1000
    }
}

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  //Views Folder

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'))); //Public Folder

app.use(methodOverride('_method'));

app.use(session(configSession));

app.use(express.json());

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Locals object ka middleware (locals object present in response variable)
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//Passport Local
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support



// ------------------------Razorpay----------------------------

// Your Razorpay credentials
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post('/create-order', async (req, res) => {
    try {
        // Ensure amount is provided and is a valid number
        const { amount } = req.body;
        // if (!amount || isNaN(amount) || amount <= 0) {
        //     return res.status(400).json({ error: 'Invalid amount' });
        // }

        // Razorpay expects the amount in paise (100 paise = 1 INR)
        const amountInPaise = amount * 100;

        // Create the order on Razorpay
        const options = {
            amount: amountInPaise, // Amount in paise
            currency: 'INR', // Currency code (INR for Indian Rupees)
            receipt: `receipt_${Math.random()}`, // Unique receipt ID
        };

        const order = await razorpayInstance.orders.create(options);

        // Send the order_id back to the client
        res.json({
            order_id: order.id,
            amount: amountInPaise,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send({ error: 'Failed to create Razorpay order' });
    }
});


//Har incoming request ke liye chale
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);


//Seeding DB
// seedDB();

app.listen(8080, () => {
    console.log('Server connected at port 8080');
})