import { Card, Container, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import '../css/Dashboard.css'; // ← Importamos los estilos separados

export const Dashboard = () => {
  const { admin } = useAdmin();

  return (
    <div className="dashboard-dark-bg">
      <Container>
        
        {/* SECCIÓN 1: Banner de Bienvenida Dinámico */}
        <Row className="mb-4">
          <Col>
            <Card className="card-dark p-4">
              <h1 className="fw-bold text-white mb-1" style={{ fontSize: 'clamp(1.8rem, 1.5rem + 1vw, 2.5rem)' }}>
                ¡Hola, {admin?.name || 'Administrador'}!
              </h1>
              <p className="text-white-50 mb-0">
                Panel de control centralizado. Sector actual:{' '}
                <span className="badge bg-primary text-uppercase px-2 py-1 ms-1">
                  {admin?.sector || 'Soporte'}
                </span>
              </p>
            </Card>
          </Col>
        </Row>

        {/* SECCIÓN 2: Tarjetas de Métricas Principales (Tus 3 indicadores) */}
        <Row className="g-4 mb-4">
          <Col xs={12} md={4}>
            <Card className="card-dark text-center py-2">
              <Card.Body className="p-4">
                <Card.Title className="text-muted text-uppercase small fw-bold tracking-wider mb-3">
                  Clientes Activos
                </Card.Title>
                <Card.Text className="display-4 fw-bold text-primary">24</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card className="card-dark text-center py-2">
              <Card.Body className="p-4">
                <Card.Title className="text-muted text-uppercase small fw-bold tracking-wider mb-3">
                  Solicitudes Pendientes
                </Card.Title>
                <Card.Text className="display-4 fw-bold text-primary">5</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card className="card-dark text-center py-2">
              <Card.Body className="p-4">
                <Card.Title className="text-muted text-uppercase small fw-bold tracking-wider mb-3">
                  Usuarios Nuevos
                </Card.Title>
                <Card.Text className="display-4 fw-bold text-primary">8</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SECCIÓN 3: Contenido Central (Para rellenar el espacio vacío) */}
        <Row className="g-4">
          
          {/* Lado Izquierdo: Rendimiento / Barras de Progreso */}
          <Col xs={12} lg={8}>
            <Card className="card-dark p-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0 text-white">Rendimiento del Sistema</h5>
                  <span className="badge bg-dark text-white-50 border border-secondary border-opacity-25">Últimos 30 días</span>
                </div>
                
                <div className="py-2">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between small mb-1 text-white-50">
                      <span>Resolución de Soporte</span>
                      <span className="fw-bold text-white">85%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '8px' }}>
                      <div className="progress-bar bg-primary" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between small mb-1 text-white-50">
                      <span>Retención de Clientes</span>
                      <span className="fw-bold text-white">92%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '8px' }}>
                      <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between small mb-1 text-white-50">
                      <span>Saturación del Servidor</span>
                      <span className="fw-bold text-white">34%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '8px' }}>
                      <div className="progress-bar bg-warning" style={{ width: '34%' }}></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Lado Derecho: Actividad Reciente */}
          <Col xs={12} lg={4}>
            <Card className="card-dark p-3">
              <Card.Body>
                <h5 className="fw-bold mb-4 text-white">Actividad Reciente</h5>
                
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-start gap-2 activity-item">
                    <span className="text-primary fs-5" style={{ lineHeight: '1' }}>●</span>
                    <div>
                      <p className="mb-0 small fw-bold text-white">Ingreso Exitoso</p>
                      <small className="text-white-50 d-block">
                        El administrador {admin?.name || 'mauro'} inició sesión.
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-2 activity-item">
                    <span className="text-success fs-5" style={{ lineHeight: '1' }}>●</span>
                    <div>
                      <p className="mb-0 small fw-bold text-white">Sincronización API</p>
                      <small className="text-white-50 d-block">
                        Conexión estable con FakeStoreAPI.
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-2 activity-item">
                    <span className="text-info fs-5" style={{ lineHeight: '1' }}>●</span>
                    <div>
                      <p className="mb-0 small fw-bold text-white">Backup Local</p>
                      <small className="text-white-50 d-block">
                        Estado persistido en LocalStorage correctamente.
                      </small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </Container>
    </div>
  );
};