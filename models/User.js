const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
  googleId: {
    type: String,
  },
});
module.exports = User = mongoose.model("users", UserSchema);
