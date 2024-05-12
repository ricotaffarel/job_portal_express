const express = require('express');

const routeJobCategories = express.Router()

routeJobCategories.get('/admin/job-category', (req, res) => {
    res.render('admin/jobCategory/index',)
})

routeJobCategories.get('/admin/job-category/create', (req, res) => {
    res.render('admin/jobCategory/create')
})

module.exports = { routeJobCategories };