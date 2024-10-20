import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductTable from './components/ProductTable';
import CustomerTable from './components/CustomerTable';
import SaleTable from './components/SaleTable';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/products" element={<ProductTable />} />
        <Route path="/clients" element={<CustomerTable />} />
        <Route path="/sales" element={<SaleTable />} />
      </Routes>
    </Router>
  );
}

export default App;
