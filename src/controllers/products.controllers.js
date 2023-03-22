const ProductsService = require('../services/products.services');
const errorMap = require('../utils/errorMap');

async function getAllProducts(_req, res) {
  const products = await ProductsService.getAllProducts();
  return res.status(200).json(products);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const { type, message } = await ProductsService.getProductById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
}

module.exports = {
  getAllProducts,
  getProductById,
};