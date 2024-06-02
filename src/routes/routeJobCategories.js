const express = require('express');
const { JobCategoryController } = require('../controllers/jobCategoryController');
const { restrictToLogin } = require('../utils/password');

const routeJobCategories = express.Router()
const jobCategoryController = new JobCategoryController

routeJobCategories.get('/admin/job-category', restrictToLogin, (req, res) => {
    jobCategoryController.get(req, res)
})

routeJobCategories.get('/admin/job-category/create', restrictToLogin, (req, res) => {
    res.render('admin/jobCategory/create')
})

routeJobCategories.post('/admin/job-category/create', restrictToLogin, (req, res) => {
    jobCategoryController.create(req, res)
})

routeJobCategories.post('/admin/job-category/delete/:id', restrictToLogin, (req, res) => {
    jobCategoryController.delete(req, res)
})

routeJobCategories.post('/admin/job-category/update/:id', restrictToLogin, (req, res) => {
    jobCategoryController.update(req, res)
})

module.exports = { routeJobCategories };