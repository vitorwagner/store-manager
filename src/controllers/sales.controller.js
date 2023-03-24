const SalesService = require('../services/sales.services');
const errorMap = require('../utils/errorMap');

async function getAllSales(_req, res) {
  const sales = await SalesService.getAllSales();
  return res.status(200).json(sales);
}

async function getSaleById(req, res) {
  const { id } = req.params;
  const { type, message } = await SalesService.getSalesById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
}

async function postSaleProduct(req, res) {
  const products = req.body;
  const { type, message } = await SalesService.postSaleProduct(products);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
}

async function deleteSaleProduct(req, res) {
  const { id } = req.params;
  const { type, message } = await SalesService.deleteSaleProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
}

module.exports = {
  postSaleProduct,
  getAllSales,
  getSaleById,
  deleteSaleProduct,
};
