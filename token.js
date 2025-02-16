const crypto = require('crypto')

const generate = () => {
    return crypto.randomBytes(64).toString('hex')
}

console.log(generate())