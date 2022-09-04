const { Brand } = require('../models');

const addBrand = async (req, res, next) => {
    /**
     * This controller adds a new brand to an
     * organizations brands list
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const brandName = req.body.brandName;
        const status = req.body.status;
        const organizationId = user.organizationId;

        // create a new brand object
        await Brand.create({
            brandName,
            status,
            organizationId
        });

        res.status(201).json({
            message: 'Brand created successflly',
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

const getBrands = async (req, res, next) => {
    /**
     * This controller returns all the brand 
     *  the brands collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get brands
        let brands = await Brand.find({ organizationId: user.organizationId })
            .sort({ brandName: 1 });
        res.json({
            data: brands,
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

const updateBrand = async (req, res, next) => {
    /**
     * This controller updates the a brand status
     */

    try {
        const brandId = req.body.brandId;
        const status = req.body.status;
        // find the authenticated user
        const user = res.locals.user;

        let brand = await Brand.findOne({
            _id: brandId,
            organizationId: user.organizationId
        });
        // update
        brand.status = status;
        brand.save();

        res.json({
            data: brand,
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
    
const deleteBrand = async (req, res, next) => {
    /**
     * This controller delete a brand
     */
    try {
        const brandId = req.body.brandId;
        // find the authenticated user
        const user = res.locals.user;

        let brand = await Brand.findOneAndDelete({
            _id: brandId,
            organizationId: user.organizationId
        });

        return res.json({
            data: brand,
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

module.exports = { addBrand, getBrands, updateBrand, deleteBrand };