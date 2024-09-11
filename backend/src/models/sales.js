const pool = require('./connectionDB');

const Sale = {
  async create(product_id, customer_id, quantity) {
    const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [product_id]);
    const product = productResult.rows[0];
    const total_price = product.price * quantity;

    const result = await pool.query(
      'INSERT INTO sales (product_id, customer_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_id, customer_id, quantity, total_price]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query('SELECT * FROM sales');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, product_id, customer_id, quantity) {
    const currentData = await pool.query(
      'SELECT product_id, customer_id, quantity, total_price FROM sales WHERE id = $1',
      [id]
    );
  
    if (currentData.rows.length === 0) {
      throw new Error('Venda não encontrada');
    }
  
    const updatedProductId = product_id || currentData.rows[0].product_id;
  
    const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [updatedProductId]);
    if (productResult.rows.length === 0) {
      throw new Error('Produto não encontrado');
    }
    const product = productResult.rows[0];
  
    const updatedQuantity = quantity || currentData.rows[0].quantity;
    const total_price = product.price * updatedQuantity;
  
    const updatedCustomerId = customer_id || currentData.rows[0].customer_id;
  
    const result = await pool.query(
      'UPDATE sales SET product_id = $1, customer_id = $2, quantity = $3, total_price = $4 WHERE id = $5 RETURNING *',
      [updatedProductId, updatedCustomerId, updatedQuantity, total_price, id]
    );
  
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM sales WHERE id = $1', [id]);
  },
};

module.exports = Sale;
