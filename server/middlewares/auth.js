// auth.js

// check if user is authrnticated

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
