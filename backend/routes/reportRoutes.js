const express = require('express');
const reportController = require('../src/controllers/reportController');
const router = express.Router();

router.get('/products', reportController.estoqueReport);
router.get('/sales', reportController.salesReport);
router.get('/customers', reportController.customersReport);

module.exports = router;
