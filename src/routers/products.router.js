const express = require('express');
const productsController = require('../controllers/products.controllers');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.postProduct);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;