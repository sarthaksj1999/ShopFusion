const express = require('express');
// const User = require('../models/User');
const passport = require('passport');
const router = express.Router();
const { signupForm, registerUser, loginForm, logout } = require('../controllers/auth');

//To show the form of signup
router.get('/register', signupForm);

//To actually register a user in DB
router.post('/register', registerUser)

//To get login form
router.get('/login', loginForm);

//To actually login via DB (passport method)
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
    }),
    (req, res) => {
        req.flash('success', 'Welcome Back');
        res.redirect('/products');
    });


//Logout
router.get('/logout', logout);


module.exports = router;























