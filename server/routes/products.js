const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController"); // Import the getProducts controller
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middlewares/auth.js");

// get route for products
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct); // to get by _id
router.get("/reviews", getAllReviews);

// router.get("/test", (req, res) => {
//   res.status(200).json({ message: "Test route works!" });
// });

// post route for products
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  newProduct
);

// put route for products (update)
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateProduct
);

router.put("/reviews", isAuthenticatedUser, createReview);

// delete route for products (remove)
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProduct
);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
