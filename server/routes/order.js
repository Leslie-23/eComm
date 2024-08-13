const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { authorizedRoles } = require("../middlewares/auth");

router.post(
  "/order/new",
  isAuthenticatedUser,
  authorizedRoles("user"),
  newOrder
);

module.exports = router;
