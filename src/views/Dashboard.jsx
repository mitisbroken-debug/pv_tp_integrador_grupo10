import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Dashboard = () => {
  const { admin } = useAdmin();

  const metrics = [
    { id: 1, title: 'CLIENTES ACTIVOS', value: 24 },
    { id: 2, title: 'SOLICITUDES PENDIENTES', value: 5 },
    { id: 3, title: 'USUARIOS NUEVOS', value: 8 },
  ];

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-4">
          <Col lg={10}>
            <div>
              <h1>¡Hola, {admin?.name || 'maria'}!</h1>
              <p>Panel de administración integrado - Grupo 10</p>
              
              <Row className="g-4 mb-4">
                {metrics.map((metric) => (
                  <Col key={metric.id} xs={12} md={4}>
                    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                      <span>{metric.title}</span>
                      <h2>{metric.value}</h2>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};