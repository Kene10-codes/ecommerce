const Joi = require('joi')

// Password regex
const PASSWORD_REGEX = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})'
)

const customerValidator = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(11).required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
    email: Joi.string().email().required()
})


module.exports = {
    customerValidator
}