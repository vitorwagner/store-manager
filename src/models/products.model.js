const connection = require('../db/connection');

async function getAllProducts() {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
}

async function getProductById(id) {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
};
