const express = require('express');
const router = express.Router();
const suplierController = require('../controllers/suplierController');

router.post('/add-suplier', suplierController.addSuplier);
router.post('/update-suplier', suplierController.updateSuplier);

module.exports = router;