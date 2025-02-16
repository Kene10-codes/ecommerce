
const expressApp = require('express')
const {registerCustomer}  = require('../../controllers/customer/customer-controller.js')

module.exports = function() {
    // Initialize express router
    const router = expressApp.Router()
    // Post route for signup of a customer
    router.post('/create-customer', registerCustomer)
}
