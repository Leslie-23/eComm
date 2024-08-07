// const express = require("express");
// const router = express.Router();

// const getProducts = require("../controllers/productController");

// router.route("/products").get(getProducts);

// module.exports = router;
// D:\eComm\server\routes\products.js

const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController"); // Import the getProducts controller

// Define a GET route for products
router.get("/products", getProducts);

module.exports = router;
