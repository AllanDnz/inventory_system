import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Sistema de Estoque</Link>
      <div>
        <Link 
          to="/clients" 
          className={activeTab === '/clients' ? 'active' : ''} 
          onClick={() => setActiveTab('/clients')}
        >
          Clientes
        </Link>
        <Link 
          to="/products" 
          className={activeTab === '/products' ? 'active' : ''} 
          onClick={() => setActiveTab('/products')}
        >
          Produtos
        </Link>
        <Link 
          to="/sales" 
          className={activeTab === '/sales' ? 'active' : ''} 
          onClick={() => setActiveTab('/sales')}
        >
          Vendas
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
