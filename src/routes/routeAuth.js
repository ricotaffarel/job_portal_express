const express = require('express');
const { AuthController } = require('../controllers/authController');

const routeAuth = express.Router()
const authCOntroller = new AuthController

routeAuth.get('/', (req, res) => {
    req.session.message = null
    req.session.error = null
    res.render('login',)
})

routeAuth.post('/', (req, res) => {
    authCOntroller.login(req, res)
})

// routeAuth.delete('/admin/test', (req, res) => {
//     const msg = req.session.message
//     const username = req.body.username
//     const pw = req.body.password
//     return res.json({ message: "okok", username: username, password: pw})
//     // res.render('admin/index', { message: msg })
// })

module.exports = { routeAuth };