const express = require('express');
const { AuthController } = require('../controllers/authController');

const routeAuth = express.Router()
const authCOntroller = new AuthController

routeAuth.get('/', (req, res) => {
    res.render('login',)
})

routeAuth.post('/', (req, res) => {
    authCOntroller.login(req, res)
})

routeAuth.get('/admin', (req, res) => {
    const msg = req.session.message
    res.render('admin/index', { message: msg })
})

module.exports = { routeAuth };