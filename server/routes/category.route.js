const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add-category', categoryController.addCategory);
router.post('/update-category', categoryController.updateCategory);

module.exports = router;