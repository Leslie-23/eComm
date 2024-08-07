const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This route will show all products in the DB",
  });
};

// create new product api/v1/product/new
const Product = require("../models/product");
const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

module.exports = { getProducts, newProduct };
