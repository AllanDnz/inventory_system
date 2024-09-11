const Product = require('../models/product');

const productController = {
  async create(req, res) {
    const { name, price, quantity } = req.body;
    const product = await Product.create(name, price, quantity);
    res.json(product);
  },

  async getAll(req, res) {
    const products = await Product.getAll();
    res.json(products);
  },

  async getById(req, res) {
    const { id } = req.params;
    const product = await Product.getById(id);
    res.json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const product = await Product.update(id, name, price, quantity);
    res.json(product);
  },

  async delete(req, res) {
    const { id } = req.params;
    await Product.delete(id);
    res.sendStatus(204);
  },
};

module.exports = productController;
