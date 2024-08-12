const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController"); // Import the getProducts controller
const { isAuthenticatedUser } = require("../middlewares/auth.js");
// get route for products
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct); // to get by _id
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route works!" });
});

// post route for products
router.post("/admin/product/new", newProduct);

// put route for products (update)
router.put("/admin/product/:id", updateProduct);

// delete route for products (remove)
router.delete("/admin/product/:id", deleteProduct);

module.exports = router;
