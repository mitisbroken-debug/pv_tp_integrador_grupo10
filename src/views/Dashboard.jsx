import React from 'react';
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

  return (
    <div className="dashboard-dark-bg">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="dashboard-main-panel">
              
              <div className="dashboard-header">
                <h1 className="dashboard-title">¡Hola, {admin?.name || 'maria'}!</h1>
                <div className="dashboard-subtitle">
                  Gestión y administración del sistema • Sector: <span className="sector-badge">Soporte IT</span>
                </div>
              </div>

              <Row className="g-4 mb-5">
                {metrics.map((metric) => (
                  <Col key={metric.id} xs={12} md={4}>
                    <div 
                      className="metric-card" 
                      style={{ '--glow-color': metric.glow }} 
                    >
                      <span className="card-title-custom">{metric.title}</span>
                      <h2 className="card-value-custom">{metric.value}</h2>
                    </div>
                  </Col>
                ))}
              </Row>

              <div>
                <h2 className="section-title-custom">Actividad Reciente</h2>
                <div className="activity-container-custom">
                  {activities.map((activity) => (
                    <div key={activity.id} className="activity-row-custom">
                      <div className="d-flex align-items-center">
                        <span className="activity-dot" />
                        <span className="activity-text-custom">{activity.text}</span>
                      </div>
                      <span className="activity-time-custom">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};