const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  balance: { type: Number, default: 1000 },
});

module.exports = mongoose.model('User', UserSchema);
