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

async function postProduct(name) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
};
