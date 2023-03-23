const productsModel = require('../models/products.model');

async function getAllProducts() {
  const products = await productsModel.getAllProducts();
  return products;
}

async function getProductById(id) {
  const product = await productsModel.getProductById(id);
  if (!product) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
}

async function postProduct(name) {
  const id = await productsModel.postProduct(name);
  return { id, productName: name };
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};