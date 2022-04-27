const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('', customerController.getCustomers);
router.post('/add-customer', customerController.addCustomer);
router.post('/update-customer', customerController.updateCustomer);

module.exports = router;