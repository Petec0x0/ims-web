const express = require('express');
const router = express.Router();
const suplierController = require('../controllers/suplierController');

router.get('', suplierController.getSupliers);
router.post('', suplierController.addSuplier);
router.patch('', suplierController.updateSuplier);

module.exports = router;