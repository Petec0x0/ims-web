const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
    {
        supplierName: {
            type: String
        },

        supplierContact: {
            type: String
        },

        status: {
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

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;