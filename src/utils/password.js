const bcrypt = require('bcrypt')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function unHashPassword(password, hash) {
    return await bcrypt.compare(password, hash)
}


// Middleware to check login status
function checkLoginStatus(req, res, next) {
    if (req.session.token) {
        return res.redirect('/admin');
    } else {
        next();
    }
};

// Middleware to restrict access to authenticated users only
function restrictToLogin(req, res, next) {
    if (!req.session.token) {
        return res.redirect('/');
    } else {
        next();
    }
};

module.exports = {
    hashPassword,
    unHashPassword,
    checkLoginStatus,
    restrictToLogin
}