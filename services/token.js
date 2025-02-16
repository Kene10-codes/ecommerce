const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  const options = {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options);
};

const generateRefreshToken = (payload) => {
  const options = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
