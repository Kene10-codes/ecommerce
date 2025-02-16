// Initialize Mongodb database
const mongoose = require('mongoose')
const { MONGODB_URI_CONSTANT } = require('./constants')


module.exports = async () => {
    try {
        await mongoose.connect(MONGODB_URI_CONSTANT).then(() => {
            console.log("Mongo DB is connected")
        }).catch((error) => {
            console.error("Error", error)
        })
    } catch (error) {
        console.error(error)
    }
}

