const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: string,
    required: [true, "Please enter your name"],
    // minlength: 3,
    maxlength: [30, "Your name cannot exceed 30 characters"],
    trim: true,
    // unique: true
  },
  email: {
    type: string,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter  your password"],
    minLength: [8, "Password cannot be less thaat 8 characters"],
    // match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: [true],
    },
    url: {
      type: String,
      required: [true],
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
module.exports = mongoose.model("User", userSchema);
