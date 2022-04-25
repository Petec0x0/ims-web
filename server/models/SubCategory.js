const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        subCategoryName: {
            type: String
        },

        status: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;