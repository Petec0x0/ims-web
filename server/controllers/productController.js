const { Product } = require('../models');

const addProduct = async (req, res, next) => {
    /**
     * This controller adds a new product 
     * to the products collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;

        // get the number of douments in products
        const pro_count = await Product.countDocuments();
        // use the current count plus 1 as the next reference number
        let referenceId;
        if(pro_count < 10){
            referenceId = `PRO-00${pro_count+1}`;
        }else if(pro_count < 100){
            referenceId = `PRO-0${pro_count+1}`;
        }else{
            referenceId = `PRO-${pro_count+1}`;
        }

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
        // check if the user uploaded an image
        let thumbnailPath;
        if(req.file){
            thumbnailPath = req.file.path;
        }else {
            // add a default image if no image was uploaded
            thumbnailPath = 'uploads/thumbnails/product-placeholder.svg';
        }

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

const getProducts = async (req, res, next) => {
    /**
     * This controller returns all the product 
     * the products collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get products
        let product = await Product.find({ organizationId: user.organizationId })
            .populate('brandId')
            .populate('categoryId');
        res.json({
            data: product,
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

module.exports = { addProduct, getProducts };