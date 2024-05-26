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
routeJob.post('/admin/job/delete/:id', (req, res) => {
    jobController.delete(req, res)
})

routeJob.post('/admin/job/update/:id', (req, res) => {
    jobController.update(req, res)
})

routeJob.get('/admin/job/update/:id', async (req, res) => {
    const data = await db.job.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    })

    const expiredDate = new Date(data.expired);
    const day = String(expiredDate.getDate()).padStart(2, '0');
    const month = String(expiredDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = expiredDate.getFullYear();
    const formattedExpiredDate = `${year}-${month}-${day}`;
    
    // Now you have formattedExpiredDate in DD/MM/YYYY format
    data.expired = formattedExpiredDate;
    // return res.send(data.expired)

    const category = await db.jobCategories.findMany()
    res.render('admin/job/edit', { category: category, formData: data, })
})

module.exports = { routeJob };