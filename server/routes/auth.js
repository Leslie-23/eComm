const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword, // password reset endpoint
  resetPassword, // reset password
  getUserProfile, // get user profile
} = require("../controllers/authController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);

router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserProfile);

router.put("/password/reset/:token", resetPassword);

module.exports = router;
