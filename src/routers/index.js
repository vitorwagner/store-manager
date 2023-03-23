const express = require('express');

const router = express.Router();

const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;