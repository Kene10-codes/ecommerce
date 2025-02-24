const express = require("express");
const { signupAdmin } = require("../../controllers/admin/admin-controller");
const { loginAdmin } = require("../../controllers/auth/auth");

// Initialize express router
const router = express.Router();

// Post route for signup of a customer
router.post("/create-admin", signupAdmin);
router.post("/login-admin", loginAdmin)

module.exports = router;
