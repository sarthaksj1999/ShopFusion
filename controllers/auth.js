const User = require('../models/User');

const signupForm = (req, res) => {
    try {
        res.render('auth/signup');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
}

const registerUser = async (req, res) => {
    try {
        let { email, username, password, role } = req.body;
        const user = new User({ email, username, role });
        const newUser = await User.register(user, password);
        req.login(newUser, (err) => {
            if (err) { return next(err) }
            req.flash('success', 'Welcome, you are registered successfully.');
            return res.redirect('/products')
        });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
        return res.redirect('/products');
    }
}

const loginForm = (req, res) => {
    try {
        res.render('auth/login');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
}

const logout = (req, res) => {
    () => {
        req.logout();
    }
    req.flash('success', 'Goodbye');
    res.redirect('/login');
}


module.exports = { signupForm, registerUser, loginForm, logout }