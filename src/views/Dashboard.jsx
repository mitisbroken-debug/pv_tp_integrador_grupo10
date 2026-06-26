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

  // Estilos oscuros que simulan el login del TP
  const styles = {
    container: {
      backgroundColor: '#1a202c', // Fondo azul noche oscuro del login
      minHeight: '100vh',
      padding: '48px 12px',
      color: '#ffffff'
    },
    mainPanel: {
      backgroundColor: 'rgba(30, 41, 59, 0.4)',
      backdropFilter: 'blur(12px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '40px'
    },
    title: { fontSize: '32px', fontWeight: '700', color: '#ffffff' },
    metricCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '24px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div style={styles.mainPanel}>
              <h1 style={styles.title}>¡Hola, {admin?.name || 'maria'}!</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>Sector asignado: Soporte</p>
              
              <Row className="g-4">
                {metrics.map((metric) => (
                  <Col key={metric.id} xs={12} md={4}>
                    <div style={styles.metricCard}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{metric.title}</span>
                      <h2 style={{ margin: 0, fontWeight: '700' }}>{metric.value}</h2>
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