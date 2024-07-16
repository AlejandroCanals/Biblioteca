import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
