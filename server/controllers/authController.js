// also the userController file

const User = require("../models/user.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/jwtToken.js");
// register user => /api/vi/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body; // pulling the name, email and password from the req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "", url: "" },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

// login user => /api/vi/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);

  // create and send JWT token
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   token,
  // });
});
