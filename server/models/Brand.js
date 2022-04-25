const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        brandName: {
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

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;