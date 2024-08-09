// also the userController file

const User = require("../models/user.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");

// register user => /api/vi/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body; // pulling the name, email and password from the req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "", url: "" },
  });

  res.status(201).json({
    success: true,
    user,
  });
});
