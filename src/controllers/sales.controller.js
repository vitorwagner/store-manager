const SalesService = require('../services/sales.services');
const errorMap = require('../utils/errorMap');

async function postSaleProduct(req, res) {
  const products = req.body;
  const { type, message } = await SalesService.postSaleProduct(products);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
}

module.exports = {
  postSaleProduct,
};
