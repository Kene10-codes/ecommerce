const express = require('express')
const http = require('http')
const app = express()
const server  = http.createServer(app)

require('./services/routes')(app)

module.exports = server