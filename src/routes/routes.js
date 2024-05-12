
const express = require('express');
const { routeAuth } = require('./routeAuth');
const { routeJobCategories } = require('./routeJobCategories');

const routes = express.Router()

routes.use(routeAuth)
routes.use(routeJobCategories)

routes.get('/admin', (req, res) => {
    const msg = req.session.message
    res.render('admin/index', { message: msg })
})

module.exports = { routes }