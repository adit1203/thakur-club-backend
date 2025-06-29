const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: Number,
});

module.exports = mongoose.model('User', userSchema);
