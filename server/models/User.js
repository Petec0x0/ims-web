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

        privilegeLevel: {
            type: Number
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