const pool = require('./connectionDB');

const Product = {
  async create(name, price, quantity) {
    const result = await pool.query(
      'INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, price, quantity]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, name, price, quantity) {
    const currentData = await pool.query(
      'SELECT name, price, quantity FROM products WHERE id = $1',
      [id]
    );
  
    if (currentData.rows.length === 0) {
      throw new Error('Produto não encontrado');
    }
  
    const updatedName = name || currentData.rows[0].name;
    const updatedPrice = price || currentData.rows[0].price;
    const updatedQuantity = quantity || currentData.rows[0].quantity;
 
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [updatedName, updatedPrice, updatedQuantity, id]
    );
  
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  },
};

module.exports = Product;
