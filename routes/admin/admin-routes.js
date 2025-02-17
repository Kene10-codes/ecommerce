const express = require("express");
const { signupAdmin } = require("../../controllers/admin/admin-controller");

// Initialize express router
const router = express.Router();

// Post route for signup of a customer
router.post("/create-admin", signupAdmin);

module.exports = router;
