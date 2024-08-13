const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { authorizedRoles } = require("../middlewares/auth");

// get reqs
router.get(
  "/order/:id",
  isAuthenticatedUser,
  authorizedRoles("user"),
  getSingleOrder
);
router.get(
  "/orders/me",
  isAuthenticatedUser,
  authorizedRoles("user"),
  myOrders
);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  allOrders
);

// post reqs
router.post(
  "/order/new",
  isAuthenticatedUser,
  authorizedRoles("user"),
  newOrder
);

// put requests
router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateOrder
);

module.exports = router;
