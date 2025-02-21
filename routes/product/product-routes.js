const express = require("express"); // Require express
const router = express.Router(); // Initialize router
const {
  addProduct,
  getProduct,
  getAllProducts,
} = require("../../controllers/product/product");

// Define the routes
router.get("/", getAllProducts);
router.post("/add-product",  addProduct);
router.get("/:id", getProduct);

// Export router
module.exports = router;
