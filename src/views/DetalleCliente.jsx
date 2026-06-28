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
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner animation="border" variant="light" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-4">{error}</Alert>
        <Button variant="outline-light" className="mt-3" onClick={() => navigate('/clientes')}>
          Volver
        </Button>
      </Container>
    );
  }

  if (!client) return null;

  return (
    <Container>
      <Button variant="outline-light" className="mb-4" onClick={() => navigate('/clientes')}>
        ← Volver
      </Button>
      <h1 className="mb-4 text-white">Ficha del Cliente</h1>
      
      <Card className="card-shadow border-0 card-dark">
        <Card.Body className="p-4">
          <Card.Title className="fw-bold fs-3 mb-1">{`${client.name.firstname} ${client.name.lastname}`}</Card.Title>
          <Card.Subtitle className="mb-4 text-white-50">Usuario: {client.username}</Card.Subtitle>
          
          <Card.Text className="mb-3">
            <strong>Correo:</strong> {client.email}
          </Card.Text>
          <Card.Text className="mb-3">
            <strong>Teléfono:</strong> {client.phone}
          </Card.Text>
          <Card.Text className="mb-3">
            <strong>Dirección:</strong>
            <br />
            {client.address.street} {client.address.number}, {client.address.city}
            <br />
            {client.address.zipcode}
          </Card.Text>
          <Card.Text className="mb-0">
            <strong>Credenciales:</strong>
            <br />
            Usuario: {client.username}
            <br />
            <span className="text-danger">Contraseña: {client.password}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};