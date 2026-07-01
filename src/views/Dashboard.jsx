import React from 'react';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Dashboard = () => {
  const { admin } = useAdmin();

  const metrics = [
    { 
      id: 1, 
      title: 'Clientes Activos', 
      value: 24, 
      color: '#3b82f6',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    { 
      id: 2, 
      title: 'Proyectos Activos', 
      value: 5, 
      color: '#22c55e',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
    },
    { 
      id: 3, 
      title: 'Tareas Pendientes', 
      value: 3, 
      color: '#f59e0b',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    },
    { 
      id: 4, 
      title: 'Alertas de Sistema', 
      value: 3, 
      color: '#ef4444',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    },
  ];

  const activities = [
    { id: 1, user: 'Mauricio Villarreal', action: 'Alta de nuevo cliente (#128)', time: 'Hace 10 min', status: 'Completado', variant: 'success' },
    { id: 2, user: 'Noel Chiliguay', action: 'Actualización masiva de inventario', time: 'Hace 1 hora', status: 'Completado', variant: 'success' },
    { id: 3, user: 'Franco Sanchez', action: 'Exportación de métricas a Excel', time: 'Hace 3 horas', status: 'En proceso', variant: 'warning' },
    { id: 4, user: 'Sistema Automático', action: 'Sincronización con FakeStore API', time: 'Hace 5 horas', status: 'Completado', variant: 'success' },
    { id: 5, user: 'Sergio Soza', action: 'Intento de borrado de registro maestro', time: 'Ayer, 15:45', status: 'Rechazado', variant: 'danger' },
  ];

  const serverStats = [
    { label: 'Almacenamiento (SSD)', value: 78, variant: 'primary' },
    { label: 'Memoria RAM', value: 45, variant: 'success' },
    { label: 'Carga de CPU', value: 92, variant: 'danger' },
  ];

  return (
    <div className="dashboard-dark-bg" style={{ minHeight: '100dvh', paddingBottom: '60px' }}>
      
      <style>{`
        body, html, #root { background-color: #1a2333 !important; }
        .progress { background-color: rgba(255,255,255,0.1) !important; height: 8px !important; }
        .custom-table th { color: rgba(255,255,255,0.4) !important; font-size: 0.85rem; font-weight: 600; text-uppercase: true; }
        .custom-table td { color: rgba(255,255,255,0.8); font-size: 0.9rem; padding: 15px 8px !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
      `}</style>

      <Container fluid className="px-4 pt-4">
        
        <div className="mb-4 text-start">
          <h1 className="text-white fw-bold m-0" style={{ fontSize: '2.2rem' }}>Resumen del Sistema</h1>
          <p className="text-white-50 small m-0">Monitoreo global del grupo y paneles de control activos.</p>
        </div>

        <Row className="g-3 mb-4">
          {metrics.map((metric) => (
            <Col key={metric.id} xs={12} sm={6} lg={3}>
              <div 
                className="p-3" 
                style={{ 
                  background: '#242f41', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-white-50 small fw-medium">{metric.title}</span>
                  <div className="p-2 rounded-3" style={{ background: `${metric.color}15` }}>
                    {metric.icon}
                  </div>
                </div>
                <h3 className="text-white fw-bold m-0" style={{ fontSize: '1.8rem' }}>{metric.value}</h3>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          
          <Col xs={12} lg={8}>
            <div className="p-4 h-100" style={{ background: '#242f41', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              
              <div className="d-flex align-items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <h2 className="text-white fw-bold fs-5 m-0">Registro de Actividad</h2>
              </div>

              <div className="table-responsive">
                <table className="w-100 custom-table">
                  <thead>
                    <tr>
                      <th className="text-start pb-3">Usuario</th>
                      <th className="text-start pb-3">Acción</th>
                      <th className="text-start pb-3">Fecha</th>
                      <th className="text-end pb-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((act) => (
                      <tr key={act.id}>
                        <td className="text-start fw-medium">{act.user}</td>
                        <td className="text-start text-white-50">{act.action}</td>
                        <td className="text-start text-muted small">{act.time}</td>
                        <td className="text-end">
                          <Badge bg={act.variant} className="bg-opacity-10 text-capitalize px-3 py-1.5 rounded-pill" style={{ color: `inherit`, border: '1px solid rgba(255,255,255,0.05)' }}>
                            {act.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </Col>

          <Col xs={12} lg={4}>
            <div className="p-4 h-100" style={{ background: '#242f41', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              
              <div className="d-flex align-items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                <h2 className="text-white fw-bold fs-5 m-0">Estado del Servidor</h2>
              </div>

              <div className="d-flex flex-column gap-4">
                {serverStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between text-white-50 small mb-2">
                      <span>{stat.label}</span>
                      <span className="fw-bold text-white">{stat.value}%</span>
                    </div>
                    <ProgressBar variant={stat.variant} now={stat.value} />
                  </div>
                ))}
              </div>

            </div>
          </Col>

        </Row>

      </Container>
    </div>
  );
};