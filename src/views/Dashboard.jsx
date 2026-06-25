import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Dashboard = () => {
  const { admin } = useAdmin();

  return (
    <Container fluid>
      {/* Banner de Bienvenida Dinámico */}
      <Alert variant="primary" className="border-0 shadow-sm p-4 mb-4 text-dark bg-white">
        <h1 className="fw-bold mb-1" style={{ fontSize: 'clamp(1.8rem, 1.5rem + 1vw, 2.5rem)' }}>
          ¡Hola, {admin?.name || 'Administrador'}!
        </h1>
        <p className="text-muted mb-0">
          Panel de control centralizado. Sector actual: <span className="badge bg-primary text-wrap">{admin?.sector || 'Soporte'}</span>
        </p>
      </Alert>

      {/* Tarjetas de Métricas Principales */}
      <Row className="g-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="card-shadow h-100 border-0 text-center bg-white">
            <Card.Body className="p-4">
              <Card.Title className="text-muted text-uppercase fs-6 tracking-wider">Clientes Activos</Card.Title>
              <Card.Text className="display-4 fw-bold text-primary">24</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="card-shadow h-100 border-0 text-center bg-white">
            <Card.Body className="p-4">
              <Card.Title className="text-muted text-uppercase fs-6 tracking-wider">Solicitudes Pendientes</Card.Title>
              <Card.Text className="display-4 fw-bold text-primary">5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="card-shadow h-100 border-0 text-center bg-white">
            <Card.Body className="p-4">
              <Card.Title className="text-muted text-uppercase fs-6 tracking-wider">Usuarios Nuevos</Card.Title>
              <Card.Text className="display-4 fw-bold text-primary">8</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};