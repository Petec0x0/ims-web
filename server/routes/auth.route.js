const express = require('express');
const router = express.Router();
const  authController = require('../controllers/authController');
const verifyUser = require('../middlewares/verifyUser');

// Add "verifyUser" middleware to '/user' endpoint to authenticate it
router.get('/users', verifyUser, authController.getUsers);
router.post('/onboard', authController.onboard);
// Add "verifyUser" middleware to 'add-user' endpoint to authenticate it
router.post('/add-user', verifyUser, authController.addUser);
router.post('/login', authController.login);

module.exports = router;