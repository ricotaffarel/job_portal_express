
const express = require('express');
const { routeAuth } = require('./routeAuth');
const { routeJobCategories } = require('./routeJobCategories');
const { routeJob } = require('./routeJob');
const { restrictToLogin } = require('../utils/password');

const routes = express.Router()

routes.use(routeAuth)
routes.use(routeJobCategories)
routes.use(routeJob)

routes.get('/admin', restrictToLogin, (req, res, next) => {
    const msg = req.session.message
    req.session.message = null
    res.render('admin/index', { message: msg })
})

module.exports = { routes }