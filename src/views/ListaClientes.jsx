import { useState, useEffect } from 'react';
import { Container, Spinner, Card, Form, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/ListaCliente.css'; 

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        const res = await fetch('https://fakestoreapi.com/users');
        if (!res.ok) throw new Error('No se pudo conectar con el servidor.');
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerClientes();
  }, []);

  const eliminarClienteLocalmente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  const clientesFiltrados = clientes.filter(c => 
    c.name?.firstname?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.name?.lastname?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.address?.city?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#1a2333', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <Container>
        <div className="mb-4 text-center">
          <h2 className="fw-bold text-white tracking-wide" style={{ fontSize: '2.5rem' }}>
            DIRECTORIO DE CLIENTES
          </h2>
          <p className="text-muted">Búsqueda, auditoría interna y gestión de perfiles</p>
        </div>

        <Form.Control 
          className="shadow-sm mx-auto mb-4 custom-search bg-dark text-white border-secondary" 
          style={{ maxWidth: '600px', borderRadius: '12px', padding: '12px 20px' }} 
          placeholder="Buscar por apellido o ciudad..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
        />

        {cargando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
            <Alert.Heading className="fs-5 fw-bold">Error de Red</Alert.Heading>
            <p className="mb-0 small">{error}</p>
          </Alert>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {clientesFiltrados.map(c => (
              <Col key={c.id}>
                <Card 
                  className="h-100 text-white border-0 shadow-lg"
                  onClick={() => navigate(`/clientes/${c.id}`)}
                  style={{ 
                    cursor: 'pointer', 
                    background: '#242f41', 
                    borderRadius: '20px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="text-center pt-4">
                    <Card.Img 
                      variant="top" 
                      src={`https://i.pravatar.cc/150?u=${c.id}`} 
                      style={{ width: '85px', height: '85px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.1)' }} 
                      alt="avatar"
                    />
                  </div>
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-capitalize fw-bold mb-1 fs-5">
                        {c.name?.firstname} {c.name?.lastname}
                      </Card.Title>
                      <Card.Text className="text-white-50 small mb-3" style={{ wordBreak: 'break-word' }}>
                        {c.email}
                      </Card.Text>
                    </div>
                    
                    <div>
                      <hr className="border-secondary border-opacity-25 my-2" />
                      <Card.Text className="text-white-50 small text-capitalize mb-3">
                        📍 {c.address?.city}
                      </Card.Text>
                      <button 
                        className="btn-ver w-100 shadow-sm py-2 mb-2" 
                        style={{ borderRadius: '10px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/clientes/${c.id}`);
                        }}
                      >
                        VER PERFIL
                      </button>

                      <div className="mt-2">
                        <BotonEliminar 
                          idCliente={c.id} 
                          onEliminar={eliminarClienteLocalmente} 
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};