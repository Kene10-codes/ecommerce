/* Initialize the mongoose database
* Initialize the schema
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
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
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin