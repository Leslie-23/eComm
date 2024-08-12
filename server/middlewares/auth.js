// // auth.js

// // check if user is authrnticated or not

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

// Example: Revised isAuthenticatedUser middleware with more debugging
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(`token: ${token} in auth middleware token`); // tested successfully
  if (!token) {
    console.log("Token missing");
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("Token verification failed");
    return next(new ErrorHandler("Token is invalid or has expired", 401));
  }

  req.user = await User.findById(decoded.id);
  if (!req.user) {
    console.log("User not found");
    return next(new ErrorHandler("User not found", 404));
  }

  // console.log("User authenticated:", req.user); //tested successfully
  next();
});

// Handling user roles
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
//   const { token } = req.cookies;
//   console.log(token);

//   if (!token) {
//     return next(new ErrorHandler("Please login to access this resource", 401));
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decoded.id);
//   next();
// }); //first try at the auth middleware
