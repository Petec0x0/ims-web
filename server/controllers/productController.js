const { Product } = require('../models');

const addProduct = async (req, res, next) => {
    /**
     * This controller adds a new product 
     * to the products collection
     */
    try {
        // find the authenticated user
        const user = res.locals.user;

        /**
         * The referenceId is serving as Barcode storage.
         * If it does not exit, create one from time stamp
         */
        let referenceId;
        if (req.body.referenceId) {
            referenceId = req.body.referenceId;
        } else {
            // Create product reference from timestamp
            referenceId = `PRO${(new Date()).getTime().toString()}`;
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
        if (req.file) {
            thumbnailPath = req.file.path;
        } else {
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

    const searchString = req.query.query;

    try {
        // find the authenticated user
        const user = res.locals.user;
        // get products
        let product = await Product.find({
            organizationId: user.organizationId,
            productName: { $regex: '.*' + searchString + '.*', $options: 'i' },
        })
            .populate('brandId')
            .populate('categoryId')
            .sort({ productName: 1 });
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

const getOneProductByReference = async (req, res) => {
    /**
     * This controller returns a single based 
     * on the provided refereceId or barcode
     */
    const referenceId = req.query.referenceId;
    try {
        // find the authenticated user
        const user = res.locals.user;
        // get products
        let product = await Product.findOne({
            organizationId: user.organizationId,
            referenceId: referenceId
        });
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

const searchProduct = async (req, res, next) => {
    /**
     * This controller returns the searched product 
     * the products collection
     */

    const searchString = req.query.query;

    try {
        // find the authenticated user
        const user = res.locals.user;
        // get products
        let product = await Product.find({
            organizationId: user.organizationId,
            productName: { $regex: '.*' + searchString + '.*', $options: 'i' },
            quantity: { $gt: 0 }
        });
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

const updateProduct = async (req, res, next) => {
    /**
     * This controller updates the a product category, brand, quantity, sellingPrice
     */

    try {
        const productId = req.body.productId;
        const productName = req.body.productName;
        const purchasedPrice = req.body.purchasedPrice;
        const quantity = req.body.quantity;
        const sellingPrice = req.body.sellingPrice;
        // find the authenticated user
        const user = res.locals.user;

        let product = await Product.findOne({
            _id: productId,
            organizationId: user.organizationId
        });
        // update
        product.productName = productName;
        product.purchasedPrice = purchasedPrice;
        product.quantity = quantity;
        product.sellingPrice = sellingPrice;
        product.save();

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

const deleteProduct = async (req, res, next) => {
    /**
     * This controller delete a product
     */
    try {
        const productId = req.body.productId;
        // find the authenticated user
        const user = res.locals.user;

        let product = await Product.findOneAndDelete({
            _id: productId,
            organizationId: user.organizationId
        });

        return res.json({
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

module.exports = {
    addProduct,
    getProducts,
    searchProduct,
    updateProduct,
    deleteProduct,
    getOneProductByReference
};