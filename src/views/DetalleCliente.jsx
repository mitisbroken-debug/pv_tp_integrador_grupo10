import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import '../css/DetalleCliente.css';

export const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!response.ok) {
          throw new Error('No se encontró el cliente');
        }
        const data = await response.json();
        setClient(data);
      } catch (err) {
        setError(err.message || 'Ocurrió un error al cargar la ficha.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="detalle-dark-bg d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="light" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalle-dark-bg">
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
          <Button variant="outline-light" className="mt-3" onClick={() => navigate('/clientes')}>
            Volver
          </Button>
        </Container>
      </div>
    );
  }

  if (!client) return null;

  return (

    <div className="detalle-dark-bg">
      <Container fluid>
        <Button variant="outline-light" className="mb-4" onClick={() => navigate('/clientes')}>
          ← Volver
        </Button>
        <h1 className="mb-4 text-white">Ficha del Cliente</h1>
        
        <Card className="card-shadow border-0 card-dark">
          <Card.Body>
            <Card.Title className="fw-bold">{`${client.name.firstname} ${client.name.lastname}`}</Card.Title>
            <Card.Subtitle className="mb-3 text-white-50">Usuario: {client.username}</Card.Subtitle>
            
            <Card.Text>
              <strong>Correo:</strong> {client.email}
            </Card.Text>
            <Card.Text>
              <strong>Teléfono:</strong> {client.phone}
            </Card.Text>
            <Card.Text>
              <strong>Dirección:</strong>
              <br />
              {client.address.street} {client.address.number}, {client.address.city}
              <br />
              {client.address.zipcode}
            </Card.Text>
            <Card.Text>
              <strong>Credenciales:</strong>
              <br />
              Usuario: {client.username}
              <br />
              <span className="text-danger">Contraseña: {client.password}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};