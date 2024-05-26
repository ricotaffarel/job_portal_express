const { z } = require("zod");

const jobCategoryCreateValidation = z.object({
    category_name: z.string().min(1, 'Category Name is required'),
})

const jobCreateValidation = z.object({
    job_name: z.string().min(1, 'Job Name is required'),
    description: z.string().min(1, 'Description is required'),
    // image: z.string().min(1, 'Image is required'),
    expired: z.string().min(1, 'Expired Date is required'),
    jobCategoriesId: z.string().min(1, 'Job Categories is required'),
})

module.exports = {
    jobCategoryCreateValidation,
    jobCreateValidation
}