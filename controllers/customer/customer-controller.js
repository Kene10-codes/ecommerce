const Customer = require("../../models/Customer");
const {
  customerValidator,
} = require("../../validator/customer/customer-validator");
const { generateAccessToken } = require("../../services/token");
const { generateRefreshToken } = require("../../services/token");
const { hashPassword, hashToken } = require("../../services/bcrypt");

// Register customer
const registerCustomer = async (req, res) => {
  try {
    // Check for error
    const { error } = customerValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if customer exists alraady
    const customerExists = await Customer.findOne({ email: req.body.email });
    if (customerExists)
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });

    // Enocode / Hash customer password
    const hashedPassword = await hashPassword(req.body.password);

    // Create new customer
    const customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    // Destructure customer
    const { id, email, password: _, ...rest } = customer;

    // Generate Access and Refresh Token
    const accessToken = generateAccessToken({ email, id });

    // Generate refresh token
    let refreshToken = generateRefreshToken({ email, id });

    // Hash token
    refreshToken = await hashToken(refreshToken);

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

// Get customers
const getCustomers = async (req, res) => {
  try {
    // Fetch all customers
    const perPage = 10;
    const page = req.query.page || 1;
    const skip = perPage * page - perPage;

    // Fetch all customers in an ascending form
    const customers = await Customer.aggregate({ $sort: { $createdAt: -1 } })
      .skip(skip)
      .limit(perPage)
      .exec();

    // Count the number of customers
    const count = await Customer.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    if (!customers || customers.length === 0)
      return res.status(400).send("No customer found");

    // Return customers
    res
      .status(200)
      .send({ customers, nextPage: hasNextPage ? nextPage : null });
  } catch (error) {
    console.log(error);
  }
};

// Get A customer
const getCustomer = async (req, res) => {
  try {
    // Destructure id param
    const { id } = req.params;

    // Get customer
    const customer = await Customer.findById({ _id: id });

    // Destructure email, name
    const { email, name } = customer;

    // Check if customer with the ID exists
    if (!customer) return res.status(400).send("No customer with ID found");

    // Return customer
    res.status(200).send({ email, name });
  } catch (error) {
    console.log(error);
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    // Delete a customer
    const customer = await Customer.findByIdAndDelete({ _id: req.params.id });

    // Check if customer with ID exists
    if (!customer) return res.status(400).send("No Customer with ID found");

    // Return customer
    res.status(400).send("Customer deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

// Delete a customer
const updateCustomer = async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;
    // Delete a customer
    const customer = await Customer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        email,
        phone,
        password,
      },
      { new: true }
    );

    // Check if customer with ID exists
    if (!customer) return res.status(400).send("No Customer with ID found");

    // Return customer
    res.status(400).send("Customer updated successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerCustomer,
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};
