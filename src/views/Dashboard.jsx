import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import '../css/Dashboard.css'; 

export const Dashboard = () => {
  const { admin } = useAdmin();

  const metrics = [
    { 
      id: 1, 
      title: 'CLIENTES ACTIVOS', 
      value: 24, 
      color: '#22c55e',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    { 
      id: 2, 
      title: 'SOLICITUDES PENDIENTES', 
      value: 5, 
      color: '#f59e0b',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    },
    { 
      id: 3, 
      title: 'USUARIOS NUEVOS', 
      value: 8, 
      color: '#3b82f6',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
    },
  ];

  const activities = [
    { id: 1, text: 'Nuevo cliente registrado en el sistema', time: 'Hace 10 min', dotColor: '#22c55e' },
    { id: 2, text: 'Nueva solicitud de soporte recibida', time: 'Hace 1 hora', dotColor: '#f59e0b' },
    { id: 3, text: 'Perfil de usuario actualizado', time: 'Hace 3 horas', dotColor: '#3b82f6' },
    { id: 4, text: 'Recordatorio de seguimiento pendiente', time: 'Ayer', dotColor: '#64748b' },
  ];

  return (
    <div className="dashboard-dark-bg" style={{ minHeight: '100dvh', paddingBottom: '40px' }}>
      
      <style>{`
        body, html, #root {
          background-color: #1a2333 !important;
        }
      `}</style>

      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="dashboard-main-panel" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
              
              <div className="dashboard-header mb-5 text-center text-md-start">
                <h1 className="dashboard-title text-white fw-bold text-capitalize" style={{ fontSize: '2.8rem', marginBottom: '10px' }}>
                  ¡Hola, {admin?.name || 'maría'}!
                </h1>
                <div className="dashboard-subtitle text-white-50 fs-5">
                  Gestión y administración del sistema • Sector:{' '}
                  <span className="sector-badge px-3 py-1 bg-success bg-opacity-25 text-success rounded-pill fw-semibold border border-success border-opacity-25" style={{ fontSize: '0.95rem' }}>
                    {admin?.sector || 'Soporte IT'}
                  </span>
                </div>
              </div>

              <Row className="g-4 mb-5">
                {metrics.map((metric) => (
                  <Col key={metric.id} xs={12} md={4}>
                    <div 
                      className="metric-card p-4" 
                      style={{ 
                        background: '#242f41',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer'
                      }} 
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = `0 10px 25px ${metric.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="card-title-custom fw-bold text-white-50 small tracking-wider">{metric.title}</span>
                        <div className="p-2 rounded-3" style={{ background: `${metric.color}15` }}>
                          {metric.icon}
                        </div>
                      </div>
                      <h2 className="card-value-custom text-white fw-bold m-0" style={{ fontSize: '2.5rem' }}>{metric.value}</h2>
                    </div>
                  </Col>
                ))}
              </Row>

              <div className="mb-5 p-4" style={{ background: '#242f41', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 className="section-title-custom text-white fw-bold fs-4 mb-4">Actividad Reciente</h2>
                <div className="activity-container-custom d-flex flex-column gap-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="activity-row-custom d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', borderLeft: `4px solid ${activity.dotColor}` }}>
                      <div className="d-flex align-items-center gap-3">
                        <span className="activity-text-custom text-white-50">{activity.text}</span>
                      </div>
                      <span className="activity-time-custom text-muted small">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-5 pt-4 border-top border-secondary border-opacity-25 text-center">
                <p className="text-muted small mb-3">TP FINAL GRUPO 10 • Universidad Nacional de Jujuy</p>
                <div className="d-flex justify-content-center gap-4">
                  
                  <a href="https://www.instagram.com/unjuonline/" target="_blank" rel="noreferrer" className="text-white-50 text-decoration-none d-flex align-items-center gap-2" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e1306c'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <span className="small fw-medium">Instagram UNJu</span>
                  </a>

                  <a href="https://www.facebook.com/universidadnacionaldejujuy/?locale=es_LA" target="_blank" rel="noreferrer" className="text-white-50 text-decoration-none d-flex align-items-center gap-2" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1877f2'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <span className="small fw-medium">Facebook UNJu</span>
                  </a>

                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white-50 text-decoration-none d-flex align-items-center gap-2" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    <span className="small fw-medium">Repositorio TP</span>
                  </a>

                </div>
              </footer>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};