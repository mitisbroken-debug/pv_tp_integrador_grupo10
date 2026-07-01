import React from 'react';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Dashboard = () => {
  const { admin } = useAdmin();

  const metrics = [
    { 
      id: 1, 
      title: 'Sesiones Activas', 
      value: '42 u.', 
      color: '#3b82f6',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    { 
      id: 2, 
      title: 'Módulos Operativos', 
      value: '8 / 8', 
      color: '#22c55e',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
    },
    { 
      id: 3, 
      title: 'Peticiones API', 
      value: '1.54K', 
      color: '#f59e0b',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    },
    { 
      id: 4, 
      title: 'Tasa de Disponibilidad', 
      value: '99.8%', 
      color: '#a855f7',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
    },
  ];

  const systemPerformance = [
    { id: 1, label: 'Latencia Promedio', value: '142 ms', status: 'Excelente', variant: 'success' },
    { id: 2, label: 'Ancho de Banda', value: '45.2 Mbps', status: 'Estable', variant: 'success' },
    { id: 3, label: 'Consultas Concurrentes', value: '18 / s', status: 'Baja Carga', variant: 'primary' },
    { id: 4, label: 'Errores HTTP 5xx', value: '0', status: 'Sin Novedad', variant: 'success' }
  ];

  const serverStats = [
    { label: 'Espacio en Disco (Almacenamiento SSD)', value: 62, variant: 'primary' },
    { label: 'Consumo de Memoria Volátil (RAM)', value: 58, variant: 'warning' },
    { label: 'Rendimiento de Procesamiento (CPU)', value: 41, variant: 'success' },
  ];

  const activities = [
    { id: 1, user: 'Brian Vega', action: 'Actualización de parámetros de seguridad', time: 'Hace 5 min', status: 'Exitoso', variant: 'success', origin: '192.168.1.45' },
    { id: 2, user: 'Federico Mamani', action: 'Carga de lote de imágenes de productos', time: 'Hace 25 min', status: 'Exitoso', variant: 'success', origin: '192.168.1.87' },
    { id: 3, user: 'Sistema Central', action: 'Respaldo automático de base de datos', time: 'Hace 2 horas', status: 'Procesando', variant: 'warning', origin: 'localhost' },
    { id: 4, user: 'Mauro Chauque', action: 'Validación de tokens de acceso caducados', time: 'Hace 4 horas', status: 'Exitoso', variant: 'success', origin: '192.168.1.12' },
    { id: 5, user: 'Lucas Flores', action: 'Fallo de autenticación en pasarela externa', time: 'Hace 6 horas', status: 'Bloqueado', variant: 'danger', origin: '184.22.105.3' },
  ];

  return (
    <div className="dashboard-dark-bg" style={{ minHeight: '100dvh', paddingBottom: '60px' }}>
      
      <style>{`
        body, html, #root { background-color: #1a2333 !important; }
        .progress { background-color: rgba(255,255,255,0.08) !important; height: 10px !important; border-radius: 20px !important; }
        .custom-table th { color: rgba(255,255,255,0.4) !important; font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid rgba(255,255,255,0.08) !important; }
        .custom-table td { color: rgba(255,255,255,0.8); font-size: 0.9rem; padding: 16px 12px !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
        .data-card { background: #242f41; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
      `}</style>

      <Container fluid className="px-4 pt-4">
        
        <div className="mb-4 text-start">
          <h1 className="text-white fw-bold m-0" style={{ fontSize: '2.2rem' }}>Panel de Infraestructura</h1>
          <p className="text-white-50 small m-0">Monitoreo técnico global, auditoría de peticiones y métricas en tiempo real.</p>
        </div>

        <Row className="g-4 mb-4">
          <Col xs={12} xl={7}>
            <Row className="g-3">
              {metrics.map((metric) => (
                <Col key={metric.id} xs={12} sm={6}>
                  <div className="p-3 data-card">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-white-50 small fw-medium">{metric.title}</span>
                      <div className="p-2 rounded-3" style={{ background: `${metric.color}15` }}>
                        {metric.icon}
                      </div>
                    </div>
                    <h3 className="text-white fw-bold m-0" style={{ fontSize: '1.9rem' }}>{metric.value}</h3>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          <Col xs={12} xl={5}>
            <div className="p-4 data-card h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                <h2 className="text-white fw-bold fs-6 m-0">Recursos de Servidor Dedicado</h2>
              </div>
              <div className="d-flex flex-column gap-3">
                {serverStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between text-white-50 small mb-1" style={{ fontSize: '0.85rem' }}>
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

        <div className="p-4 data-card mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <h2 className="text-white fw-bold fs-6 m-0">Métricas de Rendimiento y Tráfico</h2>
          </div>
          <Row className="g-3">
            {systemPerformance.map((item) => (
              <Col key={item.id} xs={12} sm={6} lg={3}>
                <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div className="text-white-50 small mb-1">{item.label}</div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <span className="text-white fw-bold fs-5">{item.value}</span>
                    <Badge bg={item.variant} className="bg-opacity-10 rounded-1" style={{ fontSize: '0.75rem' }}>{item.status}</Badge>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="p-4 data-card">
          <div className="d-flex align-items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h2 className="text-white fw-bold fs-6 m-0">Bitácora de Auditoría y Eventos de Seguridad</h2>
          </div>
          <div className="table-responsive">
            <table className="w-100 custom-table">
              <thead>
                <tr>
                  <th className="text-start pb-3">Operador</th>
                  <th className="text-start pb-3">Dirección IP</th>
                  <th className="text-start pb-3">Acción Registrada</th>
                  <th className="text-start pb-3">Marca Temporal</th>
                  <th className="text-end pb-3">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr key={act.id}>
                    <td className="text-start fw-medium">{act.user}</td>
                    <td className="text-start font-monospace text-white" style={{ fontSize: '0.85rem' }}>{act.origin}</td>
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

      </Container>
    </div>
  );
};