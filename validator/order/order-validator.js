const Joi = require("joi");

// Order validation
const orderValidator = Joi.object({
  productName: Joi.string().required(),
  productDesc: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.string().required(),
});

module.exports = {
  orderValidator,
};
