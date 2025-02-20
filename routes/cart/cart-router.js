const express = require("express"); // Initializ express
const router = express.Router(); // Initialize express router
const {

  addToCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../../controllers/cart/cart-controller");
const { verifyToken } = require("../../services/jwt");

// Post route for order
router.post("/create-order", verifyToken, addToCart);
router.get("/:id", getCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
