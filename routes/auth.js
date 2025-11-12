const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport=require('passport');


//to show the fromof the sign up page
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

//actually wasnt to rreguister a userin db
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const newUser = await User.register(user, password);

    // Automatically login the user after registration
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


//to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login');
})
// to actually login in db
 router.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login',      // where to redirect if login fails
        failureFlash: true              // show flash message if login fails
    }),
    (req, res) => {
        req.flash('success', 'Welcome back!');
        res.redirect('/products');               // redirect after successful login
    }
);


//logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');  // 🔹 this fully removes the session cookie
      res.redirect('/');
    });
  });
});










module.exports = router;
