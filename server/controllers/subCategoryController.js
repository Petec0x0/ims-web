const { SubCategory } = require('../models');

const addSubCategory = async (req, res, next) => {
    /**
     * This controller adds a new subCategory to an
     * organizations categories list
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const subCategoryName = req.body.subCategoryName;
        const status = req.body.status;
        const organizationId = user.organizationId;

        // create a new subCategory object
        await SubCategory.create({
            subCategoryName,
            status,
            organizationId
        });

        res.status(201).json({
            message: 'SubCategory created successflly',
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

const updateSubCategory = async (req, res, next) => {
    /**
     * This controller updates the a subCategory status
     */

    try {
        const subCategoryId = req.body.subCategoryId;
        const status = req.body.status;
        // find the authenticated user
        const user = res.locals.user;

        let subCategory = await SubCategory.findOne({_id: subCategoryId, organizationId: user.organizationId});
        // update
        subCategory.status = status;
        subCategory.save();

        res.json({
            data: subCategory,
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

module.exports = { addSubCategory, updateSubCategory };