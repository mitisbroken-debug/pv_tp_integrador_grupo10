import React from 'react';
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
      <Navbar 
        expand="lg" 
        sticky="top" 
        className="py-2 position-relative shadow-sm border-bottom border-secondary border-opacity-10" 
        style={{ minHeight: '85px', backgroundColor: '#e2e8f0' }}
      >
        {/* AGREGUÉ 'd-none d-lg-flex' para que el logo solo se vea en PC y no tape el menú en móvil */}
        <div 
          className="position-absolute start-50 translate-middle d-none d-lg-flex align-items-center justify-content-center" 
          style={{ 
            top: '50%', 
            zIndex: 1050, 
            pointerEvents: 'none',
            height: '100%',
            maxHeight: '68px'
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 430 90" 
            style={{ 
              height: '100%', 
              width: 'auto', 
              maxHeight: '62px',
              display: 'block'
            }}
          >
            <defs>
              <linearGradient id="blueDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f2b48" />
                <stop offset="100%" stopColor="#1a365d" />
              </linearGradient>
              
              <linearGradient id="blueLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2b6cb0" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>

              <linearGradient id="blueTop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#63b3ed" />
                <stop offset="100%" stopColor="#3182ce" />
              </linearGradient>
            </defs>

            <g transform="translate(5, 4)">
              <line x1="2" y1="76" x2="88" y2="76" stroke="#cbd5e0" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="81" x2="78" y2="81" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />

              <g transform="translate(0, 10)">
                <polygon points="5,35 22,43 22,66 5,58" fill="url(#blueDark)" opacity="0.9" />
                <polygon points="22,43 38,35 38,58 22,66" fill="url(#blueLight)" opacity="0.9" />
                <polygon points="5,35 22,27 38,35 22,43" fill="url(#blueTop)" opacity="0.9" />
                <line x1="13" y1="42" x2="13" y2="58" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
                <line x1="30" y1="39" x2="30" y2="55" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
              </g>

              <g transform="translate(45, 20)">
                <polygon points="2,38 18,45 18,56 2,49" fill="url(#blueDark)" />
                <polygon points="18,45 34,38 34,49 18,56" fill="url(#blueLight)" />
                <polygon points="2,38 18,31 34,38 18,45" fill="url(#blueTop)" />
                <path d="M2,43 L18,50 L34,43" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
              </g>

              <g transform="translate(20, -4)">
                <polygon points="4,28 25,38 25,80 4,70" fill="url(#blueDark)" />
                <polygon points="25,38 46,28 46,70 25,80" fill="url(#blueLight)" />
                <polygon points="4,28 25,18 46,28 25,38" fill="url(#blueTop)" />
                <line x1="11" y1="35" x2="11" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.25" />
                <line x1="18" y1="38" x2="18" y2="69" stroke="#ffffff" strokeWidth="1.2" opacity="0.25" />
                <line x1="32" y1="38" x2="32" y2="69" stroke="#ffffff" strokeWidth="1.2" opacity="0.3" />
                <line x1="39" y1="35" x2="39" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.3" />
                <path d="M4,42 L25,52 L46,42" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
                <path d="M4,56 L25,66 L46,56" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
              </g>
            </g>

            <g transform="translate(100, 2)">
              <rect x="0" y="14" width="2.5" height="58" fill="#1d4ed8" rx="1" opacity="0.85" />
              <text x="14" y="27" fontSize="11" letterSpacing="7" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="800" fill="#334155">
                FACULTAD DE
              </text>
              <text x="12" y="56" fontSize="31.5" letterSpacing="0.5" fontFamily="'Arial Black', Gadget, sans-serif" fontWeight="900" fill="#0f172a">
                INGENIERÍA
              </text>
              <text x="14" y="72" fontSize="8.5" letterSpacing="1.4" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="700" fill="#1d4ed8">
                UNIVERSIDAD NACIONAL DE JUJUY
              </text>
            </g>
          </svg>
        </div>

        <Container fluid className="px-4">
          <Navbar.Brand as={NavLink} to="/dashboard" className="fw-bold fs-5 text-uppercase tracking-wider text-dark m-0">
            Panel de Control
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="app-navbar" />
          
          <Navbar.Collapse id="app-navbar">
            <Nav className="me-auto mt-2 mt-lg-0">
              <Nav.Link as={NavLink} to="/dashboard" className="px-3 fw-bold text-secondary small">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/clientes" className="px-3 fw-bold text-secondary small">
                Clientes
              </Nav.Link>
            </Nav>

            {admin && (
              <Nav className="ms-auto align-items-center gap-3 mt-3 mt-lg-0">
                <span className="d-none d-xl-inline text-secondary small me-2fw-semibold">
                  <span className="text-success me-1">●</span> Sistema Activo
                </span>

                <div className="bg-white px-3 py-2 rounded-3 border border-secondary border-opacity-20 d-flex align-items-center gap-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary opacity-75" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                  <span className="text-dark fw-bold small">
                    {admin.name}
                  </span>
                  <span className="badge bg-primary text-uppercase px-2 py-1" style={{ fontSize: '0.7rem', fontWeight: '700' }}>
                    {admin.sector}
                  </span>
                </div>

                <Button 
                  variant="outline-dark" 
                  size="sm" 
                  className="rounded-3 px-3 py-2 fw-semibold"
                  style={{ fontSize: '0.85rem' }}
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