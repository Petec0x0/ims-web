const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
    {   
        referenceId: {
            type: String,
            required: true
        },

        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        subTotal: {
            type: Number
        },

        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        }
    },
    {
        timestamps: false
    }
);

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;