const express = require("express");
const {
  registerCustomer,
  getCustomers,
  getCustomer,
} = require("../../controllers/customer/customer-controller.js");
const { loginCustomerViaEmail } = require("../../controllers/auth/auth.js");

// Initialize express router
const router = express.Router();
// Post route for signup of a customer
router.post("/create-customer", registerCustomer);
router.get("/auth/google", loginCustomerViaEmail);
router.get("/get-customers", getCustomers)
router.get("/:id", getCustomer)

module.exports = router;
