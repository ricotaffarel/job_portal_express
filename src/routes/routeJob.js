const express = require('express');
const { JobController } = require('../controllers/jobController');
const { db } = require('../utils/db');

const routeJob = express.Router()
const jobController = new JobController

routeJob.get('/admin/job', (req, res) => {
    jobController.get(req, res)
})

routeJob.get('/admin/job/create', async (req, res) => {
    const data = await db.jobCategories.findMany()
    res.render('admin/job/create', { category: data })
})

routeJob.post('/admin/job/create', (req, res) => {
    jobController.create(req, res)
})

routeJob.post('/admin/job/delete/:id', (req, res) => {
    jobController.delete(req, res)
})

// routeJob.post('/admin/job-category/update/:id', (req, res) => {
//     jobController.update(req, res)
// })

module.exports = { routeJob };