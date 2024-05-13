const { db } = require('../utils/db');
const { jobCategoryCreateValidation } = require('../validations/validation');
const { z } = require('zod');

class JobCategoryController {

    async get(req, res) {
        const msg = req.session.message
        const err = req.session.error
        req.session.message = null
        req.session.error = null

        const jobCategories = await db.jobCategories.findMany({
            orderBy: {
                created_at: 'desc'
            }
        })

        return res.render('admin/jobCategory/index', { message: msg, error: err, data: jobCategories })
    }

    async delete(req, res) {

        try {
            await db.jobCategories.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })

            req.session.message = "Successfully deleted"

            return res.redirect('/admin/job-category')
        } catch (error) {
            req.session.error = error.message
            return res.redirect('/admin/job-category')
        }
    }

    async create(req, res) {
        try {
            const category_name = req.body.category_name

            jobCategoryCreateValidation.parse({
                category_name: category_name
            })

            await db.jobCategories.create({
                data: {
                    name: category_name
                }
            })

            req.session.message = "Successfully created"
            return res.redirect('/admin/job-category')
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.render('admin/jobCategory/create', {
                    error: error.errors.map(e => e.message).join(', ')
                })
            } else {
                return res.render('admin/jobCategory/create', {
                    error: error.message
                })
            }
        }
    }

    async update(req, res) {
        try {
            const category_name = req.body.category_name

            jobCategoryCreateValidation.parse({
                category_name: category_name
            })

            await db.jobCategories.update({
                where: {
                    id: parseInt(req.params.id)
                },
                data: {
                    name: category_name
                }
            })

            req.session.message = "Successfully updated"
            return res.redirect('/admin/job-category')
        } catch (error) {
            if (error instanceof z.ZodError) {
                req.session.error = error.errors.map(e => e.message).join(', ')
                return res.redirect('/admin/job-category')
            } else {
                req.session.error = error.message
                return res.redirect('/admin/job-category')
            }
        }
    }
}

module.exports = { JobCategoryController };