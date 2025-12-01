
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');

// Show Register Form
router.get('/register', (req, res) => {
  res.render('auth/signup');  
});

// Handle Register Form
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!role) {
      req.flash('error', 'Please select a role (Buyer or Seller)');
      return res.redirect('/register');
    }

    const user = new User({ username, email, role });
    const newUser = await User.register(user, password);

    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash('success', `Welcome ${newUser.username}! You are successfully registered.`);
      res.redirect('/products');
    });

  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
});

// Show Login Form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Handle Login
router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/products');
  }
);

// Logout User
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

module.exports = router;
