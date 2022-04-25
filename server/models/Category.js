const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
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

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;