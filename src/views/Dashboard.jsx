import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Dashboard = () => {
  const { admin } = useAdmin();
  const [hoveredCard, setHoveredCard] = useState(null);

  const metrics = [
    { id: 1, title: 'CLIENTES ACTIVOS', value: 24, glow: 'rgba(34, 197, 94, 0.2)' },
    { id: 2, title: 'SOLICITUDES PENDIENTES', value: 5, glow: 'rgba(245, 158, 11, 0.2)' },
    { id: 3, title: 'USUARIOS NUEVOS', value: 8, glow: 'rgba(59, 130, 246, 0.2)' },
  ];

  const styles = {
    container: { backgroundColor: '#1a202c', minHeight: '100vh', padding: '48px 12px', color: '#ffffff' },
    mainPanel: { backgroundColor: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(12px)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '40px' },
    title: { fontSize: '32px', fontWeight: '700', color: '#ffffff' },
    metricCard: (id, isHovered, glowColor) => ({
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: isHovered ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: isHovered ? `0 0 15px ${glowColor}` : 'none',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.3s ease',
      padding: '24px',
      textAlign: 'center',
      cursor: 'pointer'
    })
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
                {metrics.map((metric) => {
                  const isHovered = hoveredCard === metric.id;
                  return (
                    <Col key={metric.id} xs={12} md={4}>
                      <div
                        style={styles.metricCard(metric.id, isHovered, metric.glow)}
                        onMouseEnter={() => setHoveredCard(metric.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', display: 'block', marginBottom: '8px' }}>{metric.title}</span>
                        <h2 style={{ margin: 0, fontWeight: '700', color: isHovered ? '#22c55e' : '#ffffff', transition: 'color 0.2s ease' }}>{metric.value}</h2>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};