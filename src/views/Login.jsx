import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { Person, Lock, Building } from 'react-bootstrap-icons';
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
    login({ name, password, sector });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="bg-image-container">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="glass-card p-4">
              <Card.Body>
               
                <div className="text-center mb-4">
                  <div className="outer-circle">
                    <div className="inner-circle">
                      <svg width="30" height="30" fill="white" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-white mt-3 fw-bold">Acceso al Panel</h4>
                  
                </div>

                <Form onSubmit={handleSubmit}>
                  <FloatingLabel controlId="adminName" label="Nombre del Administrador" className="mb-3 input-with-icon">
                    <div className="input-icon"><Person size={18} /></div>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder=" " required />
                  </FloatingLabel>

                  <FloatingLabel controlId="adminPassword" label="Contraseña" className="mb-3 input-with-icon">
                    <div className="input-icon"><Lock size={18} /></div>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " required />
                  </FloatingLabel>

                  <FloatingLabel controlId="adminSector" label="Sector de la Empresa" className="mb-3 input-with-icon">
                    <div className="input-icon"><Building size={18} /></div>
                    <Form.Select className="glass-select" value={sector} onChange={(e) => setSector(e.target.value)}>
                      <option value="Soporte">Soporte</option>
                      <option value="Gerencia">Gerencia</option>
                    </Form.Select>
                  </FloatingLabel>

                  <div className="d-flex justify-content-between align-items-center mb-4 small">
                    <Form.Check type="checkbox" label="Recordarme" className="text-white" />
                    <a href="#" className="text-decoration-none" style={{color: '#28a745'}}>¿Olvidaste tu contraseña?</a>
                  </div>

                  <Button type="submit" className="w-100 py-3 btn-success fw-bold">
                    INGRESAR →
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};