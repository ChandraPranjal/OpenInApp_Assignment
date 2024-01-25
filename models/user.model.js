const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  phone_number: {
    type: Number,
    required: true,
    unique:true
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    required:true
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
