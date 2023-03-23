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

async function postProduct(req, res) {
  const { name } = req.body;
  const { id, productName } = await ProductsService.postProduct(name);
  return res.status(201).json({ id, name: productName });
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};