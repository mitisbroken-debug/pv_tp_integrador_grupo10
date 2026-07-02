import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
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
    <Container className="detalle-cliente-container text-white">
      <Button
        variant="outline-light"
        className="mb-4 detalle-cliente-back-btn"
        onClick={() => navigate('/clientes')}
        aria-label="Volver atrás"
      >
        <FaArrowLeft />
      </Button>
      <h1 className="mb-4 text-center detalle-cliente-title">Ficha del Cliente</h1>
      
      <div className="detalle-cliente-card-wrapper">
        <Card className="card-shadow border-0 card-dark">
          <Card.Body className="detalle-cliente-card-body text-center">
            <div className="detalle-cliente-header">
              <Card.Title className="fw-bold fs-2 mb-2">{`${client.name.firstname} ${client.name.lastname}`}</Card.Title>
              <Card.Subtitle className="text-white-50 mb-3">Usuario: {client.username}</Card.Subtitle>
            </div>

            <div className="detalle-cliente-info">
              <Card.Text className="detalle-cliente-info-row">
                <span className="detalle-cliente-info-label">Correo</span>
                <span className="detalle-cliente-info-value">{client.email}</span>
              </Card.Text>
              <Card.Text className="detalle-cliente-info-row">
                <span className="detalle-cliente-info-label">Teléfono</span>
                <span className="detalle-cliente-info-value">{client.phone}</span>
              </Card.Text>
              <Card.Text className="detalle-cliente-info-row detalle-cliente-info-block">
                <span className="detalle-cliente-info-label">Dirección</span>
                <span className="detalle-cliente-info-value">
                  {client.address.street} {client.address.number}, {client.address.city}
                  <br />
                  {client.address.zipcode}
                </span>
              </Card.Text>
              <Card.Text className="detalle-cliente-info-row mb-0 detalle-cliente-info-block">
                <span className="detalle-cliente-info-label">Credenciales</span>
                <span className="detalle-cliente-info-value">
                  Usuario: {client.username}
                  <br />
                  <span className="text-danger">Contraseña: {client.password}</span>
                </span>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};