const Admin = require("../../models/Admin");
const { hashPassword, hashToken } = require("../../services/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/token");
const { adminValidator } = require("../../validator/admin/admin-validator");

// Admin signup
const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate admin information
    const { error } = adminValidator.validate(req.body);
    // Return error message
    if (error) return res.status(400).send(error.details[0].message);

    // Check if admin exists already
    const adminExists = await Admin.findOne({ email: req.body.email });
    if (adminExists) return res.status(400).send("Admin exists already");

    // Hash aadmin password
    const hashedPassword = await hashPassword(password);

    // Create Admin
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const token = generateAccessToken({ email });

    // Generate refresh token
    let refreshToken = generateRefreshToken({ email });

    // Hash token
    refreshToken = await hashToken(refreshToken);

    // Save token
    admin.refreshToken = refreshToken;

    // Save admin
    await admin.save();

    // Return response
    res.header("x-admin-token", token).status(201).send("Admin created");
  } catch (error) {
    console.log(error);
  }
};

// Export admin controllers
module.exports = { signupAdmin };
