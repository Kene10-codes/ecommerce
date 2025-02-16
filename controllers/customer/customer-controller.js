const Customers = require("../../models/Customer");
const {
  customerValidator
} = require("../../validator/customer/customer-validator");
const { generateAccessToken } = require("../../services/token");
const { generateRefreshToken } = require("../../services/token");
const { hashPassword } = require("../../services/bcrypt");

// Register customer
const registerCustomer = async (req, res) => {
  console.log("register customer");
  try {
    // Check for error
    const { error } = customerValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if customer exists alraady
    const customerExists = await Customers.findOne(req.body.email);
    if (customerExists)
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });

    // Enocode / Hash customer password
    const hashedPassword = await hashPassword(req.body.password);

    // Create new customer
    const customer = Customers.create({
      name: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    // Destructure customer
    const { id, email, password: _, ...rest } = customer;

    // Generate Access and Refresh Token
    const accessToken = await generateAccessToken({ email, id });

    // Generate refresh token
    const refreshToken = await generateRefreshToken({ email, id });

    // Saave refresh token in db
    customer.refreshToken = refreshToken;

    // Save customer
    await customer.save();

    // Send response to client
    res
      .header("x-auth-token", accessToken)
      .send("Cusomter registered successfully");
  } catch (error) {
    console.error("Error", error);
  }
};

module.exports = {
  registerCustomer,
};
