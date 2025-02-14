
// Initialize dotenv 
const dotenv = require("dotenv")
dotenv.config()

// Specified the port
const PORT = Number(process.env.PORT) || 3100
// Import express module
const express = require('express');

// Initialize express app
const app = express();

// listen to the server on the port 
app.listen(PORT, () => {
    console.log(`Server is rnning on port ${PORT}`)
})