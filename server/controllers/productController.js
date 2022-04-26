const { Product } = require('../models');

const addProduct = async (req, res, next) => {
    /**
     * This controller adds a new product 
     * to the products collection
     */

    try {
        // find the authenticated user
        const user = res.locals.user;

        const referenceId = req.body.referenceId;
        const productName = req.body.productName;
        const description = req.body.description;
        const brandId = req.body.brandId;
        const categoryId = req.body.categoryId;
        const subCategoryId = req.body.subCategoryId;
        const purchasedPrice = req.body.purchasedPrice;
        const sellingPrice = req.body.sellingPrice;
        const quantity = req.body.quantity;
        const unitOfMeasurement = req.body.unitOfMeasurement;
        const status = req.body.status;
        const supplierId = req.body.supplierId;
        const organizationId = user.organizationId;
        const thumbnailPath = req.file.path;

        // create a new Product object
        await Product.create({
            referenceId,
            productName,
            description,
            brandId,
            categoryId,
            subCategoryId,
            purchasedPrice,
            sellingPrice,
            quantity,
            unitOfMeasurement,
            status,
            supplierId,
            organizationId,
            thumbnailPath
        });

        res.status(201).json({
            message: 'Product added successflly',
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

module.exports = { addProduct };