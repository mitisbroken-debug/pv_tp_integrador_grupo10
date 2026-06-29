import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
export const Header = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" sticky="top" className="py-3 border-bottom shadow-sm bg-white">
        <Container fluid className="px-4">
          <Navbar.Brand as={NavLink} to="/dashboard" className="fw-bold fs-4 text-uppercase tracking-wider text-dark">
            Panel de Control
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="app-navbar" />
          
          <Navbar.Collapse id="app-navbar">
            <Nav className="me-auto mt-2 mt-lg-0">
              <Nav.Link as={NavLink} to="/dashboard" className="px-3 fw-medium text-dark">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/clientes" className="px-3 fw-medium text-dark">
                Clientes
              </Nav.Link>
            </Nav>

            {admin && (
              <Nav className="ms-auto align-items-center gap-3 mt-3 mt-lg-0">
                <span className="d-none d-xl-inline text-muted small me-2">
                  <span className="text-success me-1">●</span> Sistema Activo
                </span>

                <div className="bg-light px-3 py-2 rounded-3 border border-secondary d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                  <span className="text-dark fw-semibold small">
                    {admin.name}
                  </span>
                  <span className="badge bg-primary text-uppercase px-2 py-1" style={{ fontSize: '0.7rem' }}>
                    {admin.sector}
                  </span>
                </div>

                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="rounded-3 px-3 py-2 fw-medium"
                  onClick={handleLogout}
                >
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