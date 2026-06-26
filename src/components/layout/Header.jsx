import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export const Header = () => {
  const { admin, logout } = useAdmin();

  return (
    <header>
      {/* bg-dark y border-bottom le dan estructura. py-3 da el aire necesario */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 border-bottom border-secondary shadow-sm">
        <Container fluid className="px-4">
          
          <Navbar.Brand as={NavLink} to="/dashboard" className="fw-bold fs-3">
            Panel de Control
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="app-navbar" />
          
          <Navbar.Collapse id="app-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/dashboard" className="px-3">Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="/clientes" className="px-3">Clientes</Nav.Link>
            </Nav>

            {admin && (
              <Nav className="ms-auto align-items-center gap-3">
                <span className="text-light fw-medium">
                  {admin.name} 
                  <small className="text-muted ms-2">| {admin.sector}</small>
                </span>
                
                {/* Botón con variante outline y padding ajustado */}
                <Button variant="outline-light" size="sm" className="rounded-pill px-3" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};