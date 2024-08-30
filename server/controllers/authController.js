// also the userController file

const User = require("../models/user.js");
const mongoose = require("mongoose");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

// register user => /api/v1/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
  console.log(`req.body`, req.body);
  console.log(`req.body.avatar`, req.body.avatar);

  if (!req.body.avatar) {
    return next(new ErrorHandler("Please upload an avatar", 400));
  }

  console.log(`req.body`, req.body);
  const { avatar } = req.body;

  if (!avatar || !avatar.startsWith("data:image")) {
    return next(new ErrorHandler("Please upload a valid avatar", 400));
  }
  const base64Data = avatar.split(",")[1];

  const base64Pattern = /^[A-Za-z0-9+/=]+$/;
  if (!base64Pattern.test(base64Data)) {
    return next(new ErrorHandler("Base64 data is not valid", 400));
  }

  if (!base64Data) {
    return next(new ErrorHandler("Invalid Base64 data", 400));
  }
  // // Extract Base64 content from the avatar string
  // let base64Data;
  // if (req.body.avatar.startsWith("data:image")) {
  //   base64Data = req.body.avatar.split(",")[1];
  // } else {
  //   base64Data = req.body.avatar;
  // }

  // Upload to Cloudinary
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Data}`,
      {
        folder: "avatars",
        width: 150,
        crop: "scale",
      }
    );

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    sendToken(user, 200, res);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    next(new ErrorHandler("Error uploading avatar", 500));
  }
  // const result = await cloudinary.uploader.upload(
  //   `data:image/jpeg;base64,${base64Data}`,
  //   {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   }
  // );

  // const { name, email, password } = req.body;

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   avatar: {
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   },
  // });

  // sendToken(user, 200, res);
});

// my first register function
// exports.registerUser = catchAsyncError(async (req, res, next) => {
//   console.log(`req.body`, req.body);
//   console.log(`req.body.avatar`, req.body.avatar);
//   console.log(`req.body.avatar.url`, req.body.avatar.url);
//   console.log(`req.files`, req.files);
//   // console.log(`req.files.avatar`, req.files.avatar);
//   // const file = req.files.avatar;

//   if (!req.body.avatar || !req.body.avatar.url) {
//     return next(new ErrorHandler("Please upload an avatar", 400));
//   }
//   // let avatar = req.body.avatar;
//   // if (avatar.startsWith("data:image")) {
//   //   const base64Data = avatar.split(",")[1]; // Extract Base64 data

//   // let base64Data;
//   // if (req.body.avatar.startsWith("data:image")) {
//   //   base64Data = req.body.avatar.split(",")[1];
//   // } else {
//   //   base64Data = req.body.avatar;
//   // }

//   const result = await cloudinary.uploader.upload(req.body.avatar.url, {
//     // const result = await cloudinary.uploader.upload(
//     //   `data:image/jpeg;base64,${base64Data}`,
//     //   {
//     // const result = await cloudinary.uploader.upload(
//     //   `data:image/jpeg;base64,${base64Data}`,
//     //   {
//     folder: "avatars",
//     width: 150,
//     crop: "scale",
//     // transformations: [{ width: 150, crop: "scale" }],
//   });
//   const { name, email, password, avatar } = req.body; // pulling the name, email and password from the req.body

//   const user = await User.create({
//     name,
//     email,
//     password,
//     avatar: {
//       public_id: result.public_id,
//       url: result.secure_url,
//     },
//   });
//   console.log(req.body.avatar);
//   sendToken(user, 200, res);
//   // const token = user.getJWTToken();
//   // res.status(201).json({
//   //   success: true,
//   //   token,
//   // });

//   // res.status(200).json({
//   //   success: true,
//   //   message: "User registered successfully",
//   //   avatar: {
//   //     public_id: result.public_id,
//   //     url: result.secure_url,
//   //   },
//   // });
// });

// login user => /api/v1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  // check if user exists and password is correct in the  DB2
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  console.log(`Awaiting response from server`);
  sendToken(user, 200, res);

  //  create and send JWT token
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   token,
  // });
});

// forgot password => api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "e-comm Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // set up new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update / change password => api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // check old user password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorHandler("Current password is incorrect", 401));
  }

  // update password
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// update user profile => api/v1/me/update
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // update avatar : TODO

  res.status(200).json({
    success: true,
    user,
  });
});

// logout user => /api/v1/logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Admin routes

// get all users => /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    users,
  });
});

// get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  // checking if the mongoose ID is valid in count and length i guess;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidObjectId) {
    return next(new ErrorHandler(`Invalid ID format: ${req.params.id}`, 400));
  }

  const user = await User.findById(req.params.id).select("-password");
  // console.log(`${req.params.id}`); // validating the value manually
  if (!user) {
    return next(
      new ErrorHandler(`User not found with _id ${req.params.id} `, 404)
      // console.log(`${req.params.id}`) // testing the ${req.params.id}
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update user profile => api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user, // or user: user
  });
});

// delete user => api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User not found with _id ${req.params.id} `, 404)
    );
  }

  // remove avatar from cloudinary : TODO

  // remove user from DB
  // await user.remove(); // <--- deprectaed method
  await user.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
  });
});
