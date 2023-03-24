const connection = require('../db/connection');

async function getAllSales() {
  const [sales] = await connection.execute(
    `SELECT p.sale_id AS saleId, s.date, p.product_id AS productId, p.quantity FROM sales AS s
    JOIN sales_products AS p ON s.id = p.sale_id
    ORDER BY p.sale_id, p.product_id`,
  );
  return sales;
}

async function getSaleById(id) {
  const [sale] = await connection.execute(
    `SELECT s.date, p.product_id AS productId, p.quantity FROM sales AS s
    JOIN sales_products AS p ON s.id = p.sale_id
    WHERE p.sale_id = ?
    ORDER BY p.sale_id, p.product_id`, [id],
  );
  return sale;
}

async function postSale() {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO sales (date) VALUE (NOW())',
    );

    return insertId;
}

async function postSaleProduct(saleId, productId, quantity) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return insertId;
}

async function updateSaleProduct(saleid, productId, quantity) {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleid, productId],
  );

  return affectedRows;
}

async function deleteSale(id) {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  return affectedRows;
}

async function deleteSaleProduct(id) {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  return affectedRows;
}

module.exports = {
  postSale,
  postSaleProduct,
  getAllSales,
  getSaleById,
  deleteSale,
  deleteSaleProduct,
  updateSaleProduct,
};