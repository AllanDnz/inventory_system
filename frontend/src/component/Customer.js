import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [updateCustomer, setUpdateCustomer] = useState({ id: '', name: '', email: '', phone: '', address: '' });
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer({ ...updateCustomer, [name]: value });
  };

  const handleCreateCustomer = () => {
    axios.post('http://localhost:5000/api/customers', newCustomer)
      .then(response => setCustomers([...customers, response.data]))
      .catch(error => console.error('Erro ao criar cliente:', error));
  };

  const handleUpdateCustomer = () => {
    axios.put(`http://localhost:5000/api/customers/${updateCustomer.id}`, updateCustomer)
      .then(response => {
        const updatedCustomers = customers.map(cli =>
          cli.id === response.data.id ? response.data : cli
        );
        setCustomers(updatedCustomers);
      })
      .catch(error => console.error('Erro ao atualizar cliente:', error));
  };

  const handleDeleteCustomer = (id) => {
    axios.delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => setCustomers(customers.filter(cli => cli.id !== id)))
      .catch(error => console.error('Erro ao deletar cliente:', error));
  };

  const handleSearchCustomer = () => {
    if (searchId) {
      axios.get(`http://localhost:5000/api/customers/${searchId}`)
        .then(response => {
          const customer = response.data;
          alert(`Cliente encontrado: ID: ${customer.id}, Nome: ${customer.name}, Email: ${customer.email}, Telefone: ${customer.phone}, Endereço: ${customer.address}`);
        })
        .catch(error => console.error('Erro ao buscar cliente:', error));
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul className="customer-list">
        {customers.map(customer => (
          <li key={customer.id}>
            ID: {customer.id} - Nome: {customer.name} - Email: {customer.email} - Telefone: {customer.phone} - Endereço: {customer.address}
            <button onClick={() => handleDeleteCustomer(customer.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>Adicionar Cliente</h3>
      <div className="customer-form">
        <input type="text" name="name" placeholder="Nome" value={newCustomer.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
        <input type="text" name="phone" placeholder="Telefone" value={newCustomer.phone} onChange={handleInputChange} />
        <input type="text" name="address" placeholder="Endereço" value={newCustomer.address} onChange={handleInputChange} />
        <button onClick={handleCreateCustomer}>Adicionar</button>
      </div>
      <h3>Atualizar Cliente</h3>
      <div className="customer-form">
        <input type="text" name="id" placeholder="ID do Cliente" value={updateCustomer.id} onChange={handleUpdateInputChange} />
        <input type="text" name="name" placeholder="Nome" value={updateCustomer.name} onChange={handleUpdateInputChange} />
        <input type="email" name="email" placeholder="Email" value={updateCustomer.email} onChange={handleUpdateInputChange} />
        <input type="text" name="phone" placeholder="Telefone" value={updateCustomer.phone} onChange={handleUpdateInputChange} />
        <input type="text" name="address" placeholder="Endereço" value={updateCustomer.address} onChange={handleUpdateInputChange} />
        <button onClick={handleUpdateCustomer}>Atualizar</button>
      </div>
      <h3>Buscar Cliente por ID</h3>
      <div className="customer-form">
        <input type="text" name="searchId" placeholder="ID do Cliente" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={handleSearchCustomer}>Buscar</button>
      </div>
    </div>
  );
};

export default Customer;
