const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

router.get('', subCategoryController.getSubCategories);
router.post('', subCategoryController.addSubCategory);
router.patch('', subCategoryController.updateSubCategory);

module.exports = router;