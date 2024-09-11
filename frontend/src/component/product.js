import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', price: '', quantity: '' });
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleCreateProduct = () => {
    axios.post('http://localhost:5000/api/products', newProduct)
      .then(response => setProducts([...products, response.data]))
      .catch(error => console.error('Erro ao criar produto:', error));
  };

  const handleUpdateProduct = () => {
    axios.put(`http://localhost:5000/api/products/${updateProduct.id}`, updateProduct)
      .then(response => {
        const updatedProducts = products.map(prod =>
          prod.id === response.data.id ? response.data : prod
        );
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Erro ao atualizar produto:', error));
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter(prod => prod.id !== id)))
      .catch(error => console.error('Erro ao deletar produto:', error));
  };

  const handleSearchProduct = () => {
    if (searchId) {
      axios.get(`http://localhost:5000/api/products/${searchId}`)
        .then(response => {
          const product = response.data;
          alert(`Produto encontrado: ID: ${product.id}, Nome: ${product.name}, Preço: R$ ${product.price}, Quantidade: ${product.quantity}`);
        })
        .catch(error => console.error('Erro ao buscar produto:', error));
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id}>
            ID: {product.id} - Nome: {product.name} - Preço: R$ {product.price} - Quantidade: {product.quantity}
            <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h3>Adicionar Produto</h3>
      <div className="product-form">
        <input type="text" name="name" placeholder="Nome" value={newProduct.name} onChange={handleInputChange} />
        <input type="number" name="price" placeholder="Preço" value={newProduct.price} onChange={handleInputChange} />
        <input type="number" name="quantity" placeholder="Quantidade" value={newProduct.quantity} onChange={handleInputChange} />
        <button onClick={handleCreateProduct}>Adicionar</button>
      </div>
      <h3>Atualizar Produto</h3>
      <div className="product-form">
        <input type="text" name="id" placeholder="ID do Produto" value={updateProduct.id} onChange={handleUpdateInputChange} />
        <input type="text" name="name" placeholder="Nome" value={updateProduct.name} onChange={handleUpdateInputChange} />
        <input type="number" name="price" placeholder="Preço" value={updateProduct.price} onChange={handleUpdateInputChange} />
        <input type="number" name="quantity" placeholder="Quantidade" value={updateProduct.quantity} onChange={handleUpdateInputChange} />
        <button onClick={handleUpdateProduct}>Atualizar</button>
      </div>
      <h3>Buscar Produto por ID</h3>
      <div className="product-form">
        <input type="text" name="searchId" placeholder="ID do Produto" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={handleSearchProduct}>Buscar</button>
      </div>
    </div>
  );
};

export default Product;
