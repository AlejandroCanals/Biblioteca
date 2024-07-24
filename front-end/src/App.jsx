import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './components/auth/AuthContext';

function App() {

  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          
          <Route path="/" element={<SearchPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
