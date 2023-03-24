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

async function searchProductsByName(name) {
  const nameQuery = `%${name}%`;
  const [products] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [nameQuery],
  );
  return products;
}

async function updateProduct(id, name) {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return affectedRows;
}

async function deleteProduct(id) {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return affectedRows;
}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
};
