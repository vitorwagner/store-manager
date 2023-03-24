const productsModel = require('../models/products.model');
const schema = require('./validations/validationsInputValues');

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
  const error = schema.validateName(name);
  if (error.type) { return error; }

  const id = await productsModel.postProduct(name);
  return { id, message: name };
}

async function searchProductsByName(name) {
  const products = await productsModel.searchProductsByName(name);
  return { type: null, message: products };
}

async function updateProduct(id, name) {
  const error = schema.validateName(name);
  if (error.type) { return error; }

  const affectedRows = await productsModel.updateProduct(id, name);

  if (affectedRows === 0) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: name };
}

async function deleteProduct(id) {
  const affectedRows = await productsModel.deleteProduct(id);

  if (affectedRows === 0) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: null };
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
};