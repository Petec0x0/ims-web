const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('', salesController.getSales);
router.post('', salesController.addSales);

module.exports = router;