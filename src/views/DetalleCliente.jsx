import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

export const DetalleCliente = () => {
  const { id } = useParams();
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
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!client) return null;

  return (
    <Container fluid>
      <h1 className="mb-4">Ficha del Cliente</h1>
      <Card className="card-shadow border-0">
        <Card.Body>
          <Card.Title>{`${client.name.firstname} ${client.name.lastname}`}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">Usuario: {client.username}</Card.Subtitle>
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
            Contraseña: {client.password}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
