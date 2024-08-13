const Order = require("../models/order.js");
const Product = require("../models/product.js");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError.js");

// create a new order => /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    // pulling out the info from the req.body but will be calculated on the frontend
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user order => /api/v1/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all the orders in the DB => /api/v1/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update/process order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id ${req.params.id}`, 404)
    );
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateProduct(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateProduct(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    console.error(`Product not found with id: ${id}`); // test log for debugging
    // return; //unreachable return code for debugging
    throw new ErrorHandler("Product not found", 404); // error handler to respond to unreachable code
  }
  product.quantity = product.quantity - quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order => api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id ${req.params.id}`, 404)
    );
  }
  await order.deleteOne({
    _id: req.params.id,
  });

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
