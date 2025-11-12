const express = require('express');
const path = require('path');   // ✅ small 'p'
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const reviewRoutes = require('./routes/review');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes=require('./routes/auth');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');  // ✅ fixed require
const indexRoutes = require('./routes/index'); 
const productApi=require('./routes/api/productapi');
//mongo DB connected
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(() => {
    console.log("DB connected successfully");
})
.catch((err) => {
    console.log("Error", err);
});

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires: Date.now()+24*7*60*60*1000,
        maxAge:24*7*60*60*1000
    }
};

// Public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); //form middleware
app.use(express.json());
app.use(methodOverride('_method'));

// SESSION & FLASH middleware must come before routes
app.use(session(configSession));
app.use(flash()); // package that is used in session and cookies
app.use(passport.initialize());
app.use(passport.session());
//passport
passport.use(new LocalStrategy(User.authenticate()));   // ✅ yeh line pehle
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages accessible in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


// Set view engine
app.engine('ejs', ejsMate); //first file name, second engine we are using we are not using default engine
app.set('view engine', 'ejs'); //view engine
app.set('views', path.join(__dirname, 'views')); //views folder

// Routes (keep comments same)
app.use('/',productRoutes); //take every coming request
app.use(reviewRoutes); 
app.use(authRoutes); //so that har incomeing request ke liye path change kiya jai
app.use('/', indexRoutes);
app.use(productApi);

app.use(express.static('public'));

//seeding database
// seedDB();


// Start server
app.listen(8080, () => {
    console.log("Server connected at port 8080");
});
