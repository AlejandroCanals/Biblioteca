import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';


const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Obtiene el estado isLoggedIn y la función logout desde el contexto
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    console.log('Sesión cerrada exitosamente');
    // Redireccionar o realizar otras acciones después de cerrar sesión
    navigate('/login');// Redirige a la página de inicio de sesión
  };
  
  return (
    <Navbar expand="lg" className="mb-4" style={{ backgroundColor: '#4aa6ed' }}>
      <Navbar.Brand href="#" className="ml-2 text-black" style={{marginLeft:'2rem'}}>App de Libros</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{marginRight:'4rem'}}>
        <Nav className="mx-auto ">
          <Nav.Link href="/" className="text-black "  style={{marginRight:'1rem'}}>Buscar Libro</Nav.Link>
          <Nav.Link as={Link} to="/" className="text-black">Favoritos</Nav.Link>
        </Nav>
        <Nav className="mr-4">
          {!isLoggedIn && ( // Mostrar estos enlaces solo si el usuario no está autenticado
            <>
              <Nav.Link as={Link} to="/login" className="text-black" style={{ marginRight: '2rem' }}>
                Iniciar Sesión
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-black" style={{ marginRight: '2rem' }}>
                Registrarse
              </Nav.Link>
            </>
          )}

          {isLoggedIn && ( // Mostrar botón de logout solo si el usuario está autenticado
            <button onClick={handleLogout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          )}        </Nav>
      
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
