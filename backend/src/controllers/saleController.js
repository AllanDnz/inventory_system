const Sale = require('../models/sales');

const saleController = {
  async create(req, res) {
    const { product_id, customer_id, quantity } = req.body;
    const sale = await Sale.create(product_id, customer_id, quantity);
    res.json(sale);
  },

  async getAll(req, res) {
    const sales = await Sale.getAll();
    res.json(sales);
  },

  async getById(req, res) {
    const { id } = req.params;
    const sale = await Sale.getById(id);
    res.json(sale);
  },

  async update(req, res) {
    const { id } = req.params;
    const { product_id, customer_id, quantity } = req.body;
    const sale = await Sale.update(id, product_id, customer_id, quantity);
    res.json(sale);
  },

  async delete(req, res) {
    const { id } = req.params;
    await Sale.delete(id);
    res.sendStatus(204);
  },
};

module.exports = saleController;
