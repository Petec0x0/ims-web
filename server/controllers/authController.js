const { User, Organization } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const onboard = async (req, res, next) => {
    /**
     * This controller create a new organization 
     * and adds an admin user to the organization
     */
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email.trim().toLowerCase();

        // make sure the user does not exist already
        const user = await User.findOne({ email: email });
        // check if user exists
        if (user) {
            return res.json({
                message: 'Email address already in use',
                error: true
            })
        } 

        const organization = await Organization.create({
            organizationName: req.body.organizationName,
            creatorEmail: email
        });

        // create a new user object
        await User.create({
            username: req.body.username,
            email: email,
            password: hashedPassword,
            privilegeLevel: 1,
            organizationId: organization._id
        });

        res.status(201).json({
            message: 'Onboarded successflly',
            error: false
        })

    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }
}

const addUser = async (req, res, next) => {
    /**
     * This controller adds a new user to the organization 
     * by the admin only
     */
    try {
        // find the authenticated user
        const user = res.locals.user;

        const username = req.body.username;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email.trim().toLowerCase();
        const privilegeLevel = req.body.privilegeLevel;
        const organizationId = user.organizationId;

        // make sure the user does not exist already
        const checkuser = await User.findOne({ email: email });
        // check if user exists
        if (checkuser) {
            return res.json({
                message: 'Email address already in use',
                error: true
            })
        } 

        // create a new user object
        await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            privilegeLevel: privilegeLevel,
            organizationId: organizationId
        });

        res.status(201).json({
            message: 'User created successflly',
            error: false
        })
        
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }
}

const login = async (req, res, next) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password;

        // find user
        const user = await User.findOne({ email: email });
        // check if user exists
        if (!user) {
            return res.status(401).json({
                message: 'Authentication error: invalid username/password',
                error: true
            })
        }
        // check if user password is correct
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(401).json({
                message: 'Authentication error: invalid username/password',
                error: true
            })
        }
        // return JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // send the token through cookie in the response
        res.cookie('token', token, { httpOnly: true });
        res.json({
            message: 'User loggedin successflly',
            error: false,
            token: token
        })

    } catch (err) {
        console.log(err);
        return res.json({
            message: 'An error occured',
            error: true
        })
    }

}

module.exports = { onboard, addUser, login }