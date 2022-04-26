const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        referenceId: {
            type: String,
            required: true,
            unique: true
        },

        productName: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand'
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },

        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        },

        purchasedPrice: {
            type: Number
        },

        sellingPrice: {
            type: Number
        },

        quantity: {
            type: Number
        },

        unitOfMeasurement: {
            type: String
        },
        
        thumbnailPath: {
            type: String
        },

        status: {
            type: String
        },

        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Suplier'
        },

        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;