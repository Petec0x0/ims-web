const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
    {
        organizationName: {
            type: String
        },

        adminEmail: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;