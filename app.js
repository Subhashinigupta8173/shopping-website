if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const reviewRoutes = require('./routes/review');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const indexRoutes = require('./routes/index'); 
const productApi = require('./routes/api/productapi');
const cartRoutes = require('./routes/cart');

// MongoDB Connection
const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/shopping-app';
mongoose.set('strictQuery', true);
mongoose.connect(dbURL)
.then(() => console.log("DB connected successfully"))
.catch(err => console.log("Error", err));

// Session Config
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
};

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + User global middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// View Engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes - Proper Order
app.use(authRoutes);
app.use('/', indexRoutes);
app.use('/', productRoutes);
app.use(reviewRoutes);
app.use(productApi);
app.use('/', cartRoutes);

// seedDB(); // optional

// Server Start
app.listen(8080, () => {
    console.log("Server connected at port 8080");
});
