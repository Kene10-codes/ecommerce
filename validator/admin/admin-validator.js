const Joi = require("joi");

const adminValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  adminValidator,
};
