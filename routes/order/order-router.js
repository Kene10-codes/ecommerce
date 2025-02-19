const express = require("express"); // Initializ express
const router = express.Router(); // Initialize express router
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
} = require("../../controllers/order/order-controller");
const { verifyToken } = require("../../services/jwt");

// Post route for order
router.post("/create-order", verifyToken, addOrder);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
