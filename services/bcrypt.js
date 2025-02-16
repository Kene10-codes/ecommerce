const bcryptjs = require("bcryptjs");

const hashPassword = (password) => {
  const SALT = 10;
  return bcryptjs.hash(password, SALT);
};
module.exports = {
  hashPassword,
};
