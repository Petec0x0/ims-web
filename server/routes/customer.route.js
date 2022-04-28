const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('', customerController.getCustomers);
router.post('', customerController.addCustomer);
router.patch('', customerController.updateCustomer);

module.exports = router;