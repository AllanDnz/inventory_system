const pool = require('./connectionDB');

const Customer = {
  async create(name, email, phone, address) {
    const result = await pool.query(
      'INSERT INTO customers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, address]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query('SELECT * FROM customers');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, name, email, phone, address) {
    const currentData = await pool.query(
      'SELECT name, email, phone, address FROM customers WHERE id = $1',
      [id]
    );
  
    if (currentData.rows.length === 0) {
      throw new Error('Cliente não encontrado');
    }
  
    const updatedName = name || currentData.rows[0].name;
    const updatedEmail = email || currentData.rows[0].email;
    const updatedPhone = phone || currentData.rows[0].phone;
    const updatedAddress = address || currentData.rows[0].address;
 
    const result = await pool.query(
      'UPDATE customers SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 RETURNING *',
      [updatedName, updatedEmail, updatedPhone, updatedAddress, id]
    );
  
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
  },
};

module.exports = Customer;
