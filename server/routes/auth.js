const express = require('express');
const router = express.Router();
const  authController = require('../controllers/authController');

router.post('/onboard', authController.onboard);
router.post('/add-user', authController.addUser);
router.post('/login', authController.login);

module.exports = router;