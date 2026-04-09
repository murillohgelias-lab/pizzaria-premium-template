import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal renderizando diretamente o Menu */}
        <Route path="/" element={<Menu />} />
        
        {/* Fallback para qualquer outra rota não encontrada */}
        <Route path="*" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
