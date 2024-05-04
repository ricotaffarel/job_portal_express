
const express = require('express');
const { routeAuth } = require('./routeAuth');

const routes = express.Router()

routes.use(routeAuth)

module.exports = { routes }