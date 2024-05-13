const { z } = require("zod");

const jobCategoryCreateValidation = z.object({
    category_name: z.string().min(1, 'Category Name is required'),
})

module.exports = {
    jobCategoryCreateValidation
}