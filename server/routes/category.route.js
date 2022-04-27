const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('', categoryController.getCategories);
router.post('/add-category', categoryController.addCategory);
router.post('/update-category', categoryController.updateCategory);

module.exports = router;