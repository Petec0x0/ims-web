const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('', salesController.getSales);
router.post('/add-sales', salesController.addSales);

module.exports = router;