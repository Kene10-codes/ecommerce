const passport = require("passport");
const { adminValidator } = require("../../validator/admin/admin-validator");
const { comparePassword } = require("../../services/bcrypt");
const { generateAccessToken } = require("../../services/token");
const Admin = require("../../models/Admin");

// Google Auth Login
const loginCustomerViaEmail = () => {
  try {
    passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        res.redirect("/dashboard");
      };
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Login Admin from DB
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for error in the request field
    const { error } = adminValidator.validate(req.body);

    // Return error
    if (error) return res.status(400).send(error.details[0].message);

    // Check if admin exists
    const isAdminExists = await Admin.findOne({ email });

    if (!isAdminExists)
      return res.status(400).send("Invalid email or password");

    // Compare credentials
    const isMatch = await comparePassword(password, isAdminExists.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    // Generate tokens
    const token = generateAccessToken({ email });

    // Return response
    res.header("x-admin-token", token).status(200).send("Admin logged in");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  loginAdmin,
  loginCustomerViaEmail,
};
