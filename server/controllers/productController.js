// get all productss
const getProducts = async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    count: products.length,
    products,
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
  // pagination, sort and filter are to be in this controller
};

//  get single product in the DB by '_id' => /api/v1/product/:id

const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "oops! Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// update product in the DB by '_id' => /api/v1/product/:id
const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "oops! Product not found",
    });
  } else {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

module.exports = { getProducts, newProduct, getSingleProduct, updateProduct };
