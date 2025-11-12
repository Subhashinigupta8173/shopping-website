const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const { required } = require('joi');
const router = express.Router(); // mini instance, because we can not export App that is the instance of the whole application

const { validateProduct, isLoggedIn } = require('../middleware'); // <-- fixed: import isLoggedIn

// Get all products
router.get('/products',isLoggedIn,  async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/index', { products });
    } catch (err) {
        console.error(err);
        res.status(500).render('users/error', { message: 'Something went wrong while fetching products.', error: err });
    }
});

// Form to add new product
router.get('/products/new', isLoggedIn, (req, res) => {
    try {
        res.render('products/new');
    } catch (err) {
        console.error(err);
        res.status(500).render('users/error', { message: 'Something went wrong.', error: err });
    }
});

//actually Add a new product
router.post('/products', validateProduct, isLoggedIn, async (req, res) => {
    try {
        const { name, img, price, desc } = req.body;

        // Create product and save returned object
        const newProduct = await Product.create({ name, img, price, desc });

        // Flash message
        req.flash('success','Product added successfully!');

        // Redirect to the new product’s show page
        res.redirect(`/products/${newProduct._id}`);
    } catch (err) {
        console.error('❌ Failed to create product:', err);
        res.status(500).render('users/error', { message: 'Failed to create product.', error: err });
    }
});

// Show particular product
router.get('/products/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id).populate('reviews');
        if (!foundProduct) return res.status(404).render('users/error', { message: 'Product not found.' });
        res.render('products/show', { foundProduct , msg: req.flash('msg') });
    } catch (err) {
        console.error(err);
        res.status(500).render('users/error', { message: 'Failed to fetch product.', error: err });
    }
});

// Form to edit product
router.get('/products/:id/edit', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id);
        if (!foundProduct) return res.status(404).render('users/error', { message: 'Product not found.' });
        res.render('products/edit', { foundProduct });
    } catch (err) {
        console.error(err);
        res.status(500).render('users/error', { message: 'Failed to load edit form.', error: err });
    }
});

// Update product
router.patch('/products/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        req.flash('success','product added Successfullly');
        res.redirect(`/products/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).render('users/error', { message: 'Failed to update product.', error: err });
    }
});

// Delete product
router.delete('/products/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        req.flash('success','product deleted Successfullly');
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).render('users/error', { message: 'Failed to delete product.', error: err });
    }
});

// router.post('/products/:id/like', isLoggedIn, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     const alreadyLiked = user.wishList.includes(id);

//     if (alreadyLiked) {
//       // Remove from wishlist
//       user.wishList = user.wishList.filter(pid => pid.toString() !== id);
//       await user.save();
//       return res.json({ liked: false });
//     } else {
//       // Add to wishlist
//       user.wishList.push(id);
//       await user.save();
//       return res.json({ liked: true });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// });


module.exports = router;
