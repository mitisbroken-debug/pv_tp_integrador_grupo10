import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import '../css/login.css';

export const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [sector, setSector] = useState('Soporte');
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !password.trim()) return;

    login({ name: name.trim(), sector });
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <div className="bg-image-container">
        <div className="bg-overlay d-flex align-items-center justify-content-center py-5">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} sm={10} md={8} lg={5}>
                <Card className="shadow-lg rounded-4 glass-card">
                  <Card.Body className="p-4 p-md-5">
                    
                    <div className="text-center mb-5">
                      <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" 
                        style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                      </div>
                      <h2 className="fw-bold mb-1">Acceso al Panel</h2>
                      <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Gestión y administración del sistema
                      </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      
                      <FloatingLabel
                        controlId="adminName"
                        label="Nombre del Administrador"
                        className="mb-4"
                      >
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder=" "
                          className="glass-input fw-semibold"
                          required
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="adminPassword"
                        label="Contraseña"
                        className="mb-4"
                      >
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder=" "
                          className="glass-input fw-semibold"
                          required
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="adminSector"
                        label="Sector de la Empresa"
                        className="mb-5"
                      >
                        <Form.Select 
                          value={sector} 
                          onChange={(e) => setSector(e.target.value)}
                          className="glass-input glass-select fw-semibold"
                        >
                          <option value="Soporte">Soporte</option>
                          <option value="Gerencia">Gerencia</option>
                        </Form.Select>
                      </FloatingLabel>

                      <Button 
                        type="submit" 
                        className="w-100 py-3 rounded-3 fw-bold text-uppercase btn-glass"
                      >
                        Ingresar
                      </Button>
                      
                    </Form>
                    
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};