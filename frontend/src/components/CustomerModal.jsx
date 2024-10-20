import React, { useState, useEffect } from 'react';
import './modal.css';

function CustomerModal({ customer, onClose, setCustomers, customers }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
    }
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = { name, email };

    try {
      if (customer) {
        // Atualizar cliente existente
        const response = await fetch(`http://localhost:5000/api/customers/${customer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCustomer),
        });
        const updatedCustomer = await response.json();
        setCustomers(
          customers.map((cust) => (cust.id === customer.id ? updatedCustomer : cust))
        );
      } else {
        // Adicionar novo cliente
        const response = await fetch('http://localhost:5000/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCustomer),
        });
        const addedCustomer = await response.json();
        setCustomers([...customers, addedCustomer]);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{customer ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">{customer ? 'Atualizar' : 'Adicionar'}</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerModal;
