const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User.js');

// Show Cart
router.get('/user/cart', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  
  if (!user.cart) user.cart = [];

  const totalAmount = user.cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const productinfo = user.cart.map(p => p.product.name).join(',');

  res.render('cart/cart', { user, totalAmount, productinfo });
});

// Add Item to Cart
router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
  let { productId } = req.params;
  let user = await User.findById(req.user._id);

  if (!user.cart) user.cart = [];  // Fix null cart

  let existing = user.cart.find(item => item.product.toString() === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    user.cart.push({ product: productId, quantity: 1 });
  }

  await user.save();
  req.flash("success", "Item added to cart");
  res.redirect('/user/cart');
});

// Update Quantity
router.post('/user/cart/update/:productId', isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const { action, quantity } = req.body;

  const user = await User.findById(req.user._id);

  let item = user.cart.find(i => i.product.toString() === productId);
  if (!item) return res.redirect('/user/cart');

  if (action === "increase") item.quantity++;
  if (action === "decrease" && item.quantity > 1) item.quantity--;
  if (quantity) item.quantity = Number(quantity);

  await user.save();
  res.redirect('/user/cart');
});

// Remove item
router.post('/user/cart/remove/:productId', isLoggedIn, async (req, res) => {
  const { productId } = req.params;

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { cart: { product: productId } }
  });

  res.redirect('/user/cart');
});

module.exports = router;
