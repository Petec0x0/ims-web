const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { route } = require('./auth.route');

router.get('', brandController.getBrands);
router.post('/add-brand', brandController.addBrand);
router.post('/update-brand', brandController.updateBrand);

module.exports = router;