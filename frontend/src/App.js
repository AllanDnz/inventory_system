import React from 'react';
import './App.css';
import Product from './component/product';  
import Customer from './component/Customer'; 
import Sale from './component/Sale'; 


const App = () => {
  return (
    <div className="container">
      <h1>Sistema de Estoque</h1>
      <div className="margin-bottom">
        <Product />
      </div>
      <div className="margin-bottom">
        <Customer />
      </div>
      <div className="margin-bottom">
        <Sale />
      </div>
    </div>
  );
};

export default App;
