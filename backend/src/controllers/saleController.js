const Sale = require('../models/sales');

const saleController = {
  async create(req, res) {
    const { product_id, customer_id, quantity } = req.body;

    // Logando os dados recebidos
    console.log('Criando venda com:', { product_id, customer_id, quantity });

    // Verificação simples dos dados
    if (!product_id || !customer_id || !quantity) {
      return res.status(400).json({ error: 'ID do produto, ID do cliente e quantidade são obrigatórios.' });
    }

    try {
      const sale = await Sale.create(product_id, customer_id, quantity);
      res.json(sale);
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      res.status(500).json({ error: error.message });
    }
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
