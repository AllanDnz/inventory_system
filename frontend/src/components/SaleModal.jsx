import React, { useState, useEffect } from 'react';
import './modal.css';

function SaleModal({ sale, onClose, setSales, sales }) {
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (sale) {
      setCustomerId(sale.customer_id); // Preservando o ID do cliente
      setProductId(sale.product_id); // Preservando o ID do produto
      setQuantity(sale.quantity || 1);
    }
  }, [sale]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedSale = { product_id: productId, customer_id: customerId, quantity }; // Enviando IDs do produto e cliente

    try {
      if (sale) {
        // Atualizar venda existente
        const response = await fetch(`http://localhost:5000/api/sales/${sale.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSale),
        });
        const updatedSaleData = await response.json();
        setSales(sales.map((s) => (s.id === sale.id ? updatedSaleData : s)));
      } else {
        // Adicionar nova venda
        const response = await fetch('http://localhost:5000/api/sales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSale),
        });
        const addedSale = await response.json();
        setSales([...sales, addedSale]);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar venda:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{sale ? 'Editar Venda' : 'Adicionar Venda'}</h2>
        <form onSubmit={handleSubmit}>
          {sale ? (
            <>
              <p>Cliente: {sale.customer_name}</p> {/* Exibindo nome do cliente */}
              <p>Produto: {sale.product_name}</p> {/* Exibindo nome do produto */}
            </>
          ) : (
            <>
              <label>
                ID do Cliente:
                <input
                  type="text"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </label>
              <label>
                ID do Produto:
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </label>
            </>
          )}
          <label>
            Quantidade:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="1"
            />
          </label>
          <button type="submit">{sale ? 'Atualizar' : 'Adicionar'}</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default SaleModal;
