const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
    {   
        referenceId: {
            type: String,
            required: true
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
        }
    },
    {
        timestamps: false
    }
);

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;