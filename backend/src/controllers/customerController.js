const Customer = require('../models/customers');

const customerController = {
  async create(req, res) {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.create(name, email, phone, address);
    res.json(customer);
  },

  async getAll(req, res) {
    const customers = await Customer.getAll();
    res.json(customers);
  },

  async getById(req, res) {
    const { id } = req.params;
    const customer = await Customer.getById(id);
    res.json(customer);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const customer = await Customer.update(id, name, email, phone, address);
    res.json(customer);
  },

  async delete(req, res) {
    const { id } = req.params;
    await Customer.delete(id);
    res.sendStatus(204);
  },
};

module.exports = customerController;
