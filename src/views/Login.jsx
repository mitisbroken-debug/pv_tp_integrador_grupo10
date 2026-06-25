import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Login = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('Soporte');
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;

    login({ name: name.trim(), sector });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">
                <h1 className="mb-3 text-center">Ingreso de Administrador</h1>
                <p className="text-muted mb-4 text-center">
                  Ingresa tu nombre y selecciona el sector para acceder al panel.
                </p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="adminName">
                    <Form.Label>Nombre del Administrador</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. María Gómez"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="adminSector">
                    <Form.Label>Sector de la Empresa</Form.Label>
                    <Form.Select value={sector} onChange={(e) => setSector(e.target.value)}>
                      <option>Soporte</option>
                      <option>Gerencia</option>
                    </Form.Select>
                  </Form.Group>

                  <Button type="submit" className="w-100" variant="primary">
                    Ingresar
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