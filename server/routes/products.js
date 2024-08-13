const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController"); // Import the getProducts controller
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middlewares/auth.js");

// get route for products
router.get(
  "/products",
  isAuthenticatedUser,

  getProducts
);
router.get("/product/:id", getSingleProduct); // to get by _id
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route works!" });
});

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

// delete route for products (remove)
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProduct
);

module.exports = router;
