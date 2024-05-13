const express = require('express');
const { JobCategoryController } = require('../controllers/jobCategoryController');

const routeJobCategories = express.Router()
const jobCategoryController = new JobCategoryController

routeJobCategories.get('/admin/job-category', (req, res) => {
    jobCategoryController.get(req, res)
})

routeJobCategories.get('/admin/job-category/create', (req, res) => {
    res.render('admin/jobCategory/create')
})

routeJobCategories.post('/admin/job-category/create', (req, res) => {
    jobCategoryController.create(req, res)
})

routeJobCategories.post('/admin/job-category/delete/:id', (req, res) => {
    jobCategoryController.delete(req, res)
})

routeJobCategories.post('/admin/job-category/update/:id', (req, res) => {
    jobCategoryController.update(req, res)
})

module.exports = { routeJobCategories };