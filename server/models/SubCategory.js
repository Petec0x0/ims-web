const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        subCategoryName: {
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

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;