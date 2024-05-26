
const express = require('express');
const { routeAuth } = require('./routeAuth');
const { routeJobCategories } = require('./routeJobCategories');
const { routeJob } = require('./routeJob');

const routes = express.Router()

routes.use(routeAuth)
routes.use(routeJobCategories)
routes.use(routeJob)

routes.get('/admin', (req, res) => {
    const msg = req.session.message
    req.session.message = null
    res.render('admin/index', { message: msg })
})

module.exports = { routes }