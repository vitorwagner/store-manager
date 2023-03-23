const connection = require('../db/connection');

async function postSale() {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO sales (date) VALUE (NOW())',
    );

    return insertId;
}

async function postSaleProduct(saleId, productId, quantity) {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
}

module.exports = {
  postSale,
  postSaleProduct,
};