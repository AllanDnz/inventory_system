import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
import './table.css';

function ProductTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      // Atualiza a tabela após deletar o produto
      fetchProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="table-container">
      <h1>Produtos</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar por ID ou Nome do Produto"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleAdd}>Adicionar Produto</button>
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.id.toString().includes(searchTerm)
            )
            .map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(product.id)}>Deletar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          onClose={() => setIsModalOpen(false)}
          setProducts={setProducts}
          fetchProducts={fetchProducts} // Passando a função para atualizar os dados após operações
        />
      )}
    </div>
  );
}

export default ProductTable;
