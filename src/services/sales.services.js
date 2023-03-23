const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const schema = require('./validations/validationsInputValues');

async function postSaleProduct(products) {
  const error = schema.validateSaleProduct(products);
  if (error.type) { return error; }

  const productsArray = await Promise.all(products.map(async (each) => {
    const product = await productsModel.getProductById(each.productId);
    return product;
  }));

  if (productsArray.includes(undefined)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }
  
  const id = await salesModel.postSale();

  await Promise.all(products.map(async (each) => {
    await salesModel.postSaleProduct(id, each.productId, each.quantity);
  }));

  return { message: { id, itemsSold: products } };
}

module.exports = {
  postSaleProduct,
};