const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword, // password reset endpoint
  resetPassword, // reset password
  getUserProfile,
  updatePassword,
  updateUserProfile, // get user profile
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

// post requests
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);

// get requests
router.get("/logout", logoutUser);
router.get("/me", isAuthenticatedUser, getUserProfile);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  allUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getUserDetails
);

// put requests
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateUserProfile);
router.put("/admin/user/:id", isAuthenticatedUser, updateUser);

// delete requests
router.delete("/admin/user/:id", isAuthenticatedUser, deleteUser);

module.exports = router;
