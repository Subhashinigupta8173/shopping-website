const mongoose = require('mongoose');
const Review = require('./Review');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true
        // default: "your-default-image-url.jpg"
    },
    price: {
        type: Number,   
        min: 0,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    avgRating:{
        type:Number,
        default:0
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }

});
// MIDDLE WARE THAT ARE USED BTS MONOOSE OPERATION  KARWANE ME USE HTA HAI AND JISKE ANDAR PRE ND POST     MIDDLEWARE HOTA HAI WHICH ARE BASICALLY WSED OVER THE SCHEMA AND BFORE THE Model
ProductSchema.post('findOneAndDelete', async function(doc) {
    if (doc && Array.isArray(doc.reviews) && doc.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});


let Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
