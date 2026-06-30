import { useState, useEffect } from 'react';
import { Container, Spinner, Card, Form, Alert, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaUserTie, FaMars, FaFemale, FaUserPlus } from 'react-icons/fa';
import { BotonEliminar } from '../components/common/BotonEliminar';
import { FormularioCliente } from '../components/common/FormularioCliente';
import '../css/ListaCliente.css';

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [datos, setDatos] = useState({ nombre: '', apellido: '', email: '', ciudad: '' });

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

  const handleGuardar = (e) => {
    e.preventDefault();
    const nuevoCliente = {
      id: Date.now(),
      name: { firstname: datos.nombre, lastname: datos.apellido },
      email: datos.email,
      address: { city: datos.ciudad },
      gender: 'other'
    };

    setClientes([nuevoCliente, ...clientes]);
    alert("¡Cliente agregado con éxito!");
    setShowModal(false);
    setDatos({ nombre: '', apellido: '', email: '', ciudad: '' });
  };

  const eliminarClienteLocalmente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  const clientesFiltrados = clientes.filter(c =>
    c.name?.firstname?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.name?.lastname?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.address?.city?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const obtenerIconoGenero = (genero) => {
    if (genero === 'male') return <FaMars size={40} />;
    if (genero === 'female') return <FaFemale size={40} />;
    return <FaUserTie size={40} />;
  };

  return (
    <div style={{ background: '#1a2333', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <style>{`body, html, #root { background-color: #1a2333 !important; }`}</style>
      <Container>
        <div className="mb-4 text-center">
          <h2 className="fw-bold text-white tracking-wide" style={{ fontSize: '2.5rem' }}>DIRECTORIO DE CLIENTES</h2>
          <p className="text-white">Búsqueda, auditoría interna y gestión de perfiles</p>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-4" style={{ maxWidth: '650px', margin: '0 auto' }}>
          <Form.Control
            className="shadow-sm custom-search bg-dark text-white border-secondary"
            style={{ borderRadius: '12px', padding: '12px 20px', flex: 1 }}
            placeholder="Buscar por apellido o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{
              marginLeft: '15px',
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              backgroundColor: '#28a745',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FaUserPlus />
          </button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Nuevo Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormularioCliente handleSubmit={handleGuardar} setDatos={setDatos} datos={datos} />
          </Modal.Body>
        </Modal>

        {cargando ? (
          <div className="text-center py-5"><Spinner animation="border" variant="light" /></div>
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
                  className="h-100 text-white border-0 shadow-lg cliente-card"
                  style={{
                    cursor: 'default',
                    background: 'linear-gradient(135deg, #2a3548 0%, #1f2a3b 100%)',
                    borderRadius: '22px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.28)'
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
                    <div className="avatar-wrapper" style={{ padding: '10px' }}>
                      <div className="avatar-icon">
                        {obtenerIconoGenero(c.gender)}
                      </div>
                    </div>
                  </div>
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-capitalize fw-bold mb-2 fs-5">
                        {c.name?.firstname} {c.name?.lastname}
                      </Card.Title>
                      <Card.Text className="text-white-50 small mb-3" style={{ wordBreak: 'break-word' }}>
                        {c.email}
                      </Card.Text>
                    </div>
                    <div>
                      <hr className="border-secondary border-opacity-25 my-2" />
                      <div className="cliente-info-box">
                        <Card.Text className="text-white-50 small text-capitalize mb-0">
                          📍 {c.address?.city}
                        </Card.Text>
                      </div>
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <button
                          className="btn-ver shadow-sm"
                          title="Ver perfil"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/clientes/${c.id}`);
                          }}
                        >
                          <FaEye />
                        </button>
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