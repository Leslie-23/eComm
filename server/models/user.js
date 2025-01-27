const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config({ path: __dirname + "/config/config.env" });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    // minlength: 3,
    maxlength: [30, "Your name cannot exceed 30 characters"],
    trim: true,
    // unique: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter  your password"],
    minLength: [8, "Password cannot be less thaat 8 characters"],
    match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, //regex to ensure password security
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      //   required: [true],
      default: null,
    },
    url: {
      type: String,
      //   required: [true],
      default: null,
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

// encrypting password for security before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", //process.env.JWT_EXPIRE, // to be changed to an .env variable
  });
};

// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
