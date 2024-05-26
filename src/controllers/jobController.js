const { db } = require('../utils/db');
const { jobCreateValidation } = require('../validations/validation');
const { z } = require('zod');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

class JobController {

    async get(req, res) {
        const msg = req.session.message
        const err = req.session.error
        req.session.message = null
        req.session.error = null

        const job = await db.job.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                JobCategories: true
            }
        })

        return res.render('admin/job/index', { message: msg, error: err, data: job })
    }

    async delete(req, res) {

        try {
            const data = await db.job.findFirst({
                where: {
                    id: parseInt(req.params.id)
                }
            })

            const imageFilePath = path.join(__dirname, '../../public/uploads/', data.image);
           
            // Check if the file exists and delete it
            if (fs.existsSync(imageFilePath)) {
                fs.unlinkSync(imageFilePath);
            } else {
                throw new Error('Image file not found');
            }

            // Delete the job from the database
            await db.job.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            });

            req.session.message = "Successfully deleted"

            return res.redirect('/admin/job')
        } catch (error) {
            req.session.error = error.message
            return res.redirect('/admin/job')
        }
    }

    async create(req, res) {
        try {
            const {
                job_name,
                description,
                expired,
                job_category_id
            } = req.body;

            // Perform validation using Zod
            jobCreateValidation.parse({
                job_name: job_name,
                description: description,
                expired: expired,
                jobCategoriesId: job_category_id
            });

            // Convert expired date string to Date object
            const [year, month, day] = expired.split('-').map(Number);
            const dateExpired = new Date(year, month - 1, day + 1); // Month is zero-indexed in Date constructor

            // Check if image file exists
            if (!req.files) {
                throw new Error('No image file was uploaded.');
            }

            const imageFile = req.files.image;
            if (!imageFile.mimetype.startsWith('image/')) {
                throw new Error('Uploaded file is not an image.');
            }

            // Move the image file to the desired directory (you may need to adjust the path)

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const imageName = `${uniqueSuffix}+${imageFile.name}`
            const imageFilePath = path.join(__dirname, '../../public/uploads/', imageName);
            await imageFile.mv(imageFilePath);

            // Create job in the database
            await db.job.create({
                data: {
                    jobName: job_name,
                    description: description,
                    image: imageName,
                    expired: dateExpired,
                    jobCategoriesId: parseInt(job_category_id)
                }
            });

            // Redirect with success message
            req.session.message = "Successfully created";
            return res.redirect('/admin/job');
        } catch (error) {
            // Render the form again with error message
            const data = await db.jobCategories.findMany();
            if (error instanceof z.ZodError) {
                return res.render('admin/job/create', {
                    category: data,
                    error: error.errors.map(e => e.message).join(', ')
                })
            } else {
                return res.render('admin/job/create', {
                    category: data,
                    error: error.message
                })
            }
        }
    }


    // async update(req, res) {
    //     try {
    //         const category_name = req.body.category_name

    //         jobCategoryCreateValidation.parse({
    //             category_name: category_name
    //         })

    //         await db.jobCategories.update({
    //             where: {
    //                 id: parseInt(req.params.id)
    //             },
    //             data: {
    //                 name: category_name
    //             }
    //         })

    //         req.session.message = "Successfully updated"
    //         return res.redirect('/admin/job-category')
    //     } catch (error) {
    //         if (error instanceof z.ZodError) {
    //             req.session.error = error.errors.map(e => e.message).join(', ')
    //             return res.redirect('/admin/job-category')
    //         } else {
    //             req.session.error = error.message
    //             return res.redirect('/admin/job-category')
    //         }
    //     }
    // }
}

module.exports = { JobController };