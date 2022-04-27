const { Category } = require('../models');

const addCategory = async (req, res, next) => {
    /**
     * This controller adds a new category to an
     * organizations categories list
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const categoryName = req.body.categoryName;
        const status = req.body.status;
        const organizationId = user.organizationId;

        // create a new category object
        await Category.create({
            categoryName,
            status,
            organizationId
        });

        res.status(201).json({
            message: 'Category created successflly',
            error: false
        })

    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }
}   

const getCategories = async (req, res, next) => {
    /**
     * This controller returns all the category 
     * in the categories collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get categories
        let categories = await Category.find({ organizationId: user.organizationId });
        res.json({
            data: categories,
            error: false
        })
        
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }
}


const updateCategory = async (req, res, next) => {
    /**
     * This controller updates the a category status
     */

    try {
        const categoryId = req.body.categoryId;
        const status = req.body.status;
        // find the authenticated user
        const user = res.locals.user;

        let category = await Category.findOne({_id: categoryId, organizationId: user.organizationId});
        // update
        category.status = status;
        category.save();

        res.json({
            data: category,
            error: false
        })
        
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }
}

module.exports = { addCategory, getCategories, updateCategory };