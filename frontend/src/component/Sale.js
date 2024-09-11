import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sale.css';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ product_id: '', customer_id: '', quantity: '' });
  const [updateSale, setUpdateSale] = useState({ id: '', product_id: '', customer_id: '', quantity: '' });
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Erro ao buscar vendas:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateSale({ ...updateSale, [name]: value });
  };

  const handleCreateSale = () => {
    axios.post('http://localhost:5000/api/sales', newSale)
      .then(response => setSales([...sales, response.data]))
      .catch(error => console.error('Erro ao criar venda:', error));
  };

  const handleUpdateSale = () => {
    axios.put(`http://localhost:5000/api/sales/${updateSale.id}`, updateSale)
      .then(response => {
        const updatedSales = sales.map(sale =>
          sale.id === response.data.id ? response.data : sale
        );
        setSales(updatedSales);
      })
      .catch(error => console.error('Erro ao atualizar venda:', error));
  };

  const handleDeleteSale = (id) => {
    axios.delete(`http://localhost:5000/api/sales/${id}`)
      .then(() => setSales(sales.filter(sale => sale.id !== id)))
      .catch(error => console.error('Erro ao deletar venda:', error));
  };

  const handleSearchSale = () => {
    if (searchId) {
      axios.get(`http://localhost:5000/api/sales/${searchId}`)
        .then(response => {
          const sale = response.data;
          alert(`Venda encontrada: ID: ${sale.id}, Produto ID: ${sale.product_id}, Cliente ID: ${sale.customer_id}, Quantidade: ${sale.quantity}, Total: R$ ${sale.total_price}`);
        })
        .catch(error => console.error('Erro ao buscar venda:', error));
    }
  };

  return (
    <div>
      <h2>Vendas</h2>
      <ul className="sale-list">
        {sales.map(sale => (
          <li key={sale.id}>
            ID: {sale.id} - Produto ID: {sale.product_id} - Cliente ID: {sale.customer_id} - Quantidade: {sale.quantity} - Total: R$ {sale.total_price}
            <button onClick={() => handleDeleteSale(sale.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>Adicionar Venda</h3>
      <div className="sale-form">
        <input type="number" name="product_id" placeholder="Produto ID" value={newSale.product_id} onChange={handleInputChange} />
        <input type="number" name="customer_id" placeholder="Cliente ID" value={newSale.customer_id} onChange={handleInputChange} />
        <input type="number" name="quantity" placeholder="Quantidade" value={newSale.quantity} onChange={handleInputChange} />
        <button onClick={handleCreateSale}>Adicionar</button>
      </div>
      <h3>Atualizar Venda</h3>
      <div className="sale-form">
        <input type="text" name="id" placeholder="ID da Venda" value={updateSale.id} onChange={handleUpdateInputChange} />
        <input type="number" name="product_id" placeholder="Produto ID" value={updateSale.product_id} onChange={handleUpdateInputChange} />
        <input type="number" name="customer_id" placeholder="Cliente ID" value={updateSale.customer_id} onChange={handleUpdateInputChange} />
        <input type="number" name="quantity" placeholder="Quantidade" value={updateSale.quantity} onChange={handleUpdateInputChange} />
        <button onClick={handleUpdateSale}>Atualizar</button>
      </div>
      <h3>Buscar Venda por ID</h3>
      <div className="sale-form">
        <input type="text" name="searchId" placeholder="ID da Venda" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={handleSearchSale}>Buscar</button>
      </div>
    </div>
  );
};

export default Sale;
