const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        customerName: {
            type: String
        },

        customerAddress: {
            type: String
        },
        
        customerContact: {
            type: String
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

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;