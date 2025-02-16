
// Initialize dotenv 
require("dotenv").config()

// Reeuire server
const server = require('./app')

// Specified the port
const PORT = Number(process.env.PORT) || 3100

// Import express module
const express = require('express');


/*  Initialize damtabase
*   Imports the routes
*/
require('./config/db')()


// listen to the server on the port 
server.listen(PORT, () => {
    console.log(`Server is rnning on port ${PORT}`)
})