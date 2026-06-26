import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import '../css/Dashboard.css'; 

export const Dashboard = () => {
  const { admin } = useAdmin();

  const metrics = [
    { id: 1, title: 'CLIENTES ACTIVOS', value: 24, glow: 'rgba(34, 197, 94, 0.2)' },
    { id: 2, title: 'SOLICITUDES PENDIENTES', value: 5, glow: 'rgba(245, 158, 11, 0.2)' },
    { id: 3, title: 'USUARIOS NUEVOS', value: 8, glow: 'rgba(59, 130, 246, 0.2)' },
  ];

  const activities = [
    { id: 1, text: 'Nuevo cliente registrado en el sistema', time: 'Hace 10 min' },
    { id: 2, text: 'Nueva solicitud de soporte recibida', time: 'Hace 1 hora' },
    { id: 3, text: 'Perfil de usuario actualizado', time: 'Hace 3 horas' },
    { id: 4, text: 'Recordatorio de seguimiento pendiente', time: 'Ayer' },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const styles = {
    container: { backgroundColor: '#1a202c', minHeight: '100vh', padding: '48px 12px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#ffffff' },
    mainPanel: { backgroundColor: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(12px)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '40px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' },
    header: { borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '24px', marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: '700', color: '#ffffff', margin: 0 },
    subtitle: { color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginTop: '8px' },
    sectorBadge: { backgroundColor: '#22c55e', color: '#000000', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', marginLeft: '8px' },
    metricCard: (id, isHovered, glowColor) => ({
      backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: isHovered ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)', boxShadow: isHovered ? `0 0 15px ${glowColor}` : 'none', transform: isHovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.3s ease', padding: '24px', textAlign: 'center', cursor: 'pointer'
    }),
    cardTitle: { fontSize: '11px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1.5px', display: 'block', marginBottom: '8px' },
    cardValue: (isHovered) => ({ fontSize: '42px', fontWeight: '700', color: isHovered ? '#22c55e' : '#ffffff', margin: 0, transition: 'color 0.2s ease' }),
    sectionTitle: { fontSize: '20px', fontWeight: '600', color: '#ffffff', marginBottom: '20px' },
    activityContainer: { backgroundColor: 'rgba(0, 0, 0, 0.15)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '8px' },
    activityRow: (isHovered) => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '8px', backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent', transition: 'all 0.2s ease', cursor: 'pointer' }),
    dot: (isHovered) => ({ width: '8px', height: '8px', backgroundColor: isHovered ? '#22c55e' : 'rgba(255, 255, 255, 0.4)', borderRadius: '50%', marginRight: '12px', display: 'inline-block', transition: 'all 0.2s ease', transform: isHovered ? 'scale(1.2)' : 'scale(1)' }),
    activityText: { fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' },
    activityTime: { fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)' }
  };

  return (
    <div style={styles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div style={styles.mainPanel}>
              
              <div style={styles.header}>
                <h1 style={styles.title}>¡Hola, {admin?.name || 'maria'}!</h1>
                <div style={styles.subtitle}>
                  Gestión y administración del sistema • Sector: <span style={styles.sectorBadge}>Soporte IT</span>
                </div>
              </div>

              <Row className="g-4 mb-5">
                {metrics.map((metric) => {
                  const isHovered = hoveredCard === metric.id;
                  return (
                    <Col key={metric.id} xs={12} md={4}>
                      <div
                        style={styles.metricCard(metric.id, isHovered, metric.glow)}
                        onMouseEnter={() => setHoveredCard(metric.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <span style={styles.cardTitle}>{metric.title}</span>
                        <h2 style={styles.cardValue(isHovered)}>{metric.value}</h2>
                      </div>
                    </Col>
                  );
                })}
              </Row>

              <div>
                <h2 style={styles.sectionTitle}>Actividad Reciente</h2>
                <div style={styles.activityContainer}>
                  {activities.map((activity) => {
                    const isRowHovered = hoveredRow === activity.id;
                    return (
                      <div
                        key={activity.id}
                        style={styles.activityRow(isRowHovered)}
                        onMouseEnter={() => setHoveredRow(activity.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <div className="d-flex align-items-center">
                          <span style={styles.dot(isRowHovered)} />
                          <span style={styles.activityText}>{activity.text}</span>
                        </div>
                        <span style={styles.activityTime}>{activity.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};