const Joi = require("joi");

// Password regex
const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const adminValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).required(),
});

module.exports = {
  adminValidator,
};
