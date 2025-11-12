const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview}=require('../middleware');

// Add Review Route
router.post('/products/:id/review', validateReview,async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Find product
        const product = await Product.findById(id);
        if (!product) return res.status(404).send('Product not found');

        // Create and save review
        const review = new Review({ rating, comment });
        await review.save();

        // Push review id to product's reviews array
        product.reviews.push(review._id);
        await product.save();
        req.flash('success','Review added successfully ');

        // Redirect back to product page
        res.redirect(`/products/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving review');
    }
});

// Delete Review Route
router.delete('/products/:productId/review/:reviewId', async (req, res) => {
    const { productId, reviewId } = req.params;
    try {
        // Remove review reference from product
        await Product.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } });

        // Delete review document
        await Review.findByIdAndDelete(reviewId);

        req.flash('msg', 'Review deleted successfully');
        res.redirect(`/products/${productId}`);
    } catch (err) {
        console.error(err);
        req.flash('msg', 'Failed to delete review');
        res.redirect(`/products/${productId}`);
    }
});

module.exports = router;
