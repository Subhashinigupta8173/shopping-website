const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['buyer', 'seller'],
    default: 'buyer'
  },

  // 🛒 Add this cart schema
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

// passport plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
