const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

router.post('/add-subcategory', subCategoryController.addSubCategory);
router.post('/update-subcategory', subCategoryController.updateSubCategory);

module.exports = router;