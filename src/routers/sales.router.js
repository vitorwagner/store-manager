const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/', salesController.postSaleProduct);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteSaleProduct);
router.put('/:id', salesController.updateSaleProduct);

module.exports = router;