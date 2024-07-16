import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
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
          <Nav.Link as={Link} to="/login" className="text-black" style={{ marginRight: '2rem' }}>Iniciar Sesion</Nav.Link>

          <Nav.Link as={Link} to="/register" className="text-black" style={{ marginRight: '2rem' }}>Registrarse</Nav.Link>
        </Nav>
      
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
