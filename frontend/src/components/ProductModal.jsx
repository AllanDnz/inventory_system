import React, { useState, useEffect } from 'react';
import './modal.css';

function ProductModal({ product, onClose, fetchProducts }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(product ? product.quantity : '');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
    } else {
      setName('');
      setPrice('');
      setQuantity('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = product ? 'PUT' : 'POST';
    const url = product
      ? `http://localhost:5000/api/products/${product.id}`
      : 'http://localhost:5000/api/products';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, quantity }),
      });
      // Atualizar a lista de produtos após salvar
      fetchProducts();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit">{product ? 'Atualizar' : 'Adicionar'}</button>
          <button onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
