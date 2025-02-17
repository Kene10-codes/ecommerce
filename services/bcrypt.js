const bcryptjs = require("bcryptjs");

const hashPassword = (password) => {
  const SALT = 10;
  return bcryptjs.hash(password, SALT);
};

const hashToken = (token) => {
  const SALT = 10;
  return bcryptjs.hash(token, SALT);
};

module.exports = {
  hashPassword,
  hashToken,
};
