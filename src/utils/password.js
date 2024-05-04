const bcrypt = require('bcrypt')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function unHashPassword(password, hash) {
    return await bcrypt.compare(password, hash)
}

module.exports = {
    hashPassword,
    unHashPassword
}