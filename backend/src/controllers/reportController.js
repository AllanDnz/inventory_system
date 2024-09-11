const Sale = require('../models/sales');
const Product = require('../models/product');
const Customer = require('../models/customers');

const reportController = {
  async estoqueReport(req, res) {
    const products = await Product.getAll();
    const totalValue = products.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
    const totalItems = products.length;
    res.json({ totalItems, totalValue });
  },

  async salesReport(req, res) {
    const sales = await Sale.getAll();
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((acc, sale) => acc + parseFloat(sale.total_price), 0);
    res.json({ totalSales, totalRevenue });
  },

  async customersReport(req, res) {
    const customers = await Customer.getAll();
    const totalCustomers = customers.length;
    res.json({ totalCustomers });
  },
};

module.exports = reportController;
