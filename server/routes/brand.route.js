const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { route } = require('./auth.route');

router.get('', brandController.getBrands);
router.post('', brandController.addBrand);
router.patch('', brandController.updateBrand);

module.exports = router;