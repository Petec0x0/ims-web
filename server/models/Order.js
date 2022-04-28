const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        referenceId: {
            type: String,
            required: true
        },
        
        orderDate: {
            type: Date,
            default: () => Date.now() + 7*24*60*60*1000
        },

        salesPersonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },

        grandTotal: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;