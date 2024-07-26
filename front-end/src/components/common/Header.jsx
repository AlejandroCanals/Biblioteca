import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirigir o actualizar el estado si es necesario
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Navbar expand="lg" className="mb-4" style={{ backgroundColor: "#4aa6ed" }}>
      <Navbar.Brand
        href="#"
        className="ml-2 text-black"
        style={{ marginLeft: "2rem" }}
      >
        App de Libros
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ marginRight: "4rem" }}>
        <Nav className="mx-auto ">
          <Nav.Link
            href="/"
            className="text-black "
            style={{ marginRight: "1rem" }}
          >
            Buscar Libro
          </Nav.Link>
          <Nav.Link as={Link} to="/" className="text-black">
            Favoritos
          </Nav.Link>
        </Nav>
        <Nav className="mr-4">
          {!currentUser ? (
            <>
              <Nav.Link
                as={Link}
                to="/login"
                className="text-black"
                style={{ marginRight: "2rem" }}
              >
                Iniciar Sesión
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className="text-black"
                style={{ marginRight: "2rem" }}
              >
                Registrarse
              </Nav.Link>
            </>
          ) : (
            // Mostrar botón de logout solo si el usuario está autenticado
            <>
              <span className="text-black" style={{ marginRight: "2rem" }}>
                Bienvenido, {currentUser.username}
                {/* Muestra el nombre de usuario */}
              </span>
              <button onClick={handleLogout} className="btn btn-danger">
                Cerrar Sesión
              </button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
