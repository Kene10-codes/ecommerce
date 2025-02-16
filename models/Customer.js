/* Initialize the mongoose database
* Initialize the schema
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    Notificationame: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minlength: 11,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    refreshToken: {
        type: String,
    },
    roles: {
        type: String,
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer