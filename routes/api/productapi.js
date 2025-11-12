const express = require('express');
const { isLoggedIn } = require('../../middleware');
const route = express.Router();
const User = require('../../models/User');

route.post('/products/:itemId/like', isLoggedIn, async (req, res) => {
  try {
    let { itemId } = req.params;
    let user = req.user;

    // Ensure the user object is fully populated from DB
    if (!user || !user._id) {
      return res.status(401).send('User not found or not logged in');
    }

    // Fetch fresh user data (because req.user might not have wishList)
    user = await User.findById(user._id);

    // Ensure wishlist exists
    if (!user.wishList) {
      user.wishList = [];
    }

    // Check if product is already liked
    let isLiked = user.wishList.includes(itemId);

    // Choose update operation dynamically
    const option = isLiked ? '$pull' : '$addToSet';

    // Update user's wishlist
    req.user = await User.findByIdAndUpdate(
      user._id,
      { [option]: { wishList: itemId } },
      { new: true }
    );

    res.send('Like done api');
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = route;
