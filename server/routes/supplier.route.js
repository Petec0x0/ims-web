const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('', supplierController.getSuppliers);
router.post('', supplierController.addSupplier);
router.patch('', supplierController.updateSupplier);
router.delete('', supplierController.deleteSupplier);

module.exports = router;