import React, { useState, useEffect } from 'react';
import SaleModal from './SaleModal';
import './table.css';

function SaleTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);

  // Função para buscar as vendas do backend
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sales');
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    fetchSales();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/sales/${id}`, {
        method: 'DELETE',
      });
      setSales(sales.filter((sale) => sale.id !== id));
    } catch (error) {
      console.error('Erro ao deletar venda:', error);
    }
  };

  const handleEdit = (sale) => {
    setCurrentSale(sale);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentSale(null);
    setIsModalOpen(true);
  };

  return (
    <div className="table-container">
      <h1>Vendas</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar por ID ou Nome do Cliente"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleAdd}>Adicionar Venda</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Quantidade</th> {/* Adicionando coluna de quantidade */}
            <th>Preço Total</th> {/* Nova coluna para o preço total */}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sales
            .filter((sale) => {
              const customerName = sale.customer_name ? sale.customer_name.toLowerCase() : '';
              return (
                customerName.includes(searchTerm.toLowerCase()) ||
                sale.id.toString().includes(searchTerm)
              );
            })
            .map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.customer_name}</td>
                <td>{sale.product_name}</td>
                <td>{sale.quantity}</td> {/* Exibindo quantidade */}
                <td>{sale.total_price}</td> {/* Exibindo preço total */}
                <td>
                  <button onClick={() => handleEdit(sale)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(sale.id)}>Deletar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && (
        <SaleModal
          sale={currentSale}
          onClose={() => setIsModalOpen(false)}
          setSales={setSales}
          sales={sales}
        />
      )}
    </div>
  );
}

export default SaleTable;
