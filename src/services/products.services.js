const createError = require('http-errors');
const productsModel = require('../models/products.model');

async function getAllProducts() {
  const products = await productsModel.getAllProducts();
  return products;
}

async function getProductById(id) {
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw new createError.NotFound('Product not found');
  }
  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
};