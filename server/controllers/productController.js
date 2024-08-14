const Product = require("../models/product");
const errorhandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures.js");

// get all productss
const getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 10;
  const productCount = await Product.countDocuments(); // to be used in the frntend

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// create new product api/v1/product/new

const newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  // pagination, sort and filter are to be in this controller
});

//  get single product in the DB by '_id' => /api/v1/admin/product/:id

const getSingleProduct = catchAsyncError(async (req, res, next) => {
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
});

// update product in the DB by '_id' => /api/v1/admin/product/:id
const updateProduct = catchAsyncError(async (req, res, next) => {
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
});

// delete product in the DB by '_id' => /api/v1/admin/product/:id
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "oops! Product not found",
    });
  }
  // await product.remove(); // has been deprecated i.e the remove() method to place on the object itself
  await Product.deleteOne({ _id: req.params.id }); // testing if the deleteOne works since we are deleting based on id

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// cretae new review => api/v1/review

const createReview = catchAsyncError(async (req, res, next) => {
  // req.body.user = req.user._id;
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

// modeule exports.
module.exports = {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
