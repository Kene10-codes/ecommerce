const jwt = require("jsonwebtoken"); // Initalize jwt

// VAerify token function
const verifyToken = async (req, res, next) => {
  // Get the token from the header
  const token = req.header("x-auth-token");
  // Check if token token exists
  if (!token) return res.status(400).send("No token provided");

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decodedToken) return res.status(400).send("The token is invalid");
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { verifyToken };
