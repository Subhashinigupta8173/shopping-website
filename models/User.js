const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  }
});

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

// ✅ Correct model name
const User = mongoose.model('User', userSchema);

module.exports = User;
