// Imported Mongoose Error
import { Error } from "mongoose"

// Initialize Mongodb database
const mongoose = require('mongoose')
const { MONGODB_URI_CONSTANT } = require('./constants')


module.exports = async () => {
    try {
        await mongoose.connect(MONGODB_URI_CONSTANT, {
            useUnifiedTopology: true
        }).then(() => {
            console.log("Mongo DB is connected")
        }).catch((error: Error) => {
            console.error("Error", error)
        })
    } catch (error) {
        console.error(error)
    }
}

