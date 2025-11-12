const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true//time ko data base me store kar deta hai date me chmnae karn eke liye ''Todate 'use karte hai

});

const Review = mongoose.model('Review', reviewSchema); 
module.exports = Review;
