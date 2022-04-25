const mongoose = require('mongoose');

const suplierSchema = new mongoose.Schema(
    {
        suplierName: {
            type: String
        },

        suplierContact: {
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

const Suplier = mongoose.model('Suplier', suplierSchema);
module.exports = Suplier;