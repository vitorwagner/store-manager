const ProductsService = require('../services/products.services');

async function getAllProducts(_req, res) {
  const products = await ProductsService.getAllProducts();
  return res.status(200).json(products);
}

async function getProductById(req, res, next) {
  const { id } = req.params;
  try {
    const product = await ProductsService.getProductById(id);
    return res.status(200).json(product);
   } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
};