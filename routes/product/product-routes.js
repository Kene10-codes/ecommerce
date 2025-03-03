const express = require("express"); // Require express
const router = express.Router(); // Initialize router
const {
  addProduct,
  getProduct,
  getAllProducts,
} = require("../../controllers/product/product");

const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

// Define the routes
router.get("/dashboard", getAllProducts);
router.post("/add-product", upload.array("photos", 10), addProduct);
router.get("/:id", getProduct);

// Export router
module.exports = router;
