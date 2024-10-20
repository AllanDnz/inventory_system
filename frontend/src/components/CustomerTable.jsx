import React, { useState, useEffect } from 'react';
import CustomerModal from './CustomerModal';
import './table.css';

function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Função para buscar os clientes do backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE',
      });
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentCustomer(null);
    setIsModalOpen(true);
  };

  return (
    <div className="table-container">
      <h1>Clientes</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar por ID ou Nome"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleAdd}>Adicionar Cliente</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) =>
              customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              customer.id.toString().includes(searchTerm)
            )
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <button onClick={() => handleEdit(customer)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(customer.id)}>Deletar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CustomerModal
          customer={currentCustomer}
          onClose={() => setIsModalOpen(false)}
          setCustomers={setCustomers}
          customers={customers}
        />
      )}
    </div>
  );
}

export default CustomerTable;