const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
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

const User = mongoose.model('User', userSchema);
module.exports = User;