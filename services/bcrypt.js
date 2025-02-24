const bcryptjs = require("bcryptjs");

// Hash Password
const hashPassword = (password) => {
  const SALT = 10;
  return bcryptjs.hash(password, SALT);
};

// Hash token
const hashToken = (token) => {
  const SALT = 10;
  return bcryptjs.hash(token, SALT);
};


// Compare Password
const comparePassword = (password, dbPassword) => {
  return bcryptjs.compare(password, dbPassword)
}
module.exports = {
  comparePassword,
  hashPassword,
  hashToken,
};
