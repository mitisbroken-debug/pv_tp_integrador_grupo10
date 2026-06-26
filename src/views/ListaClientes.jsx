import { useState, useEffect } from 'react';
import { Container, Table, Spinner, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/ListaCliente.css'; // ← IMPORTAMOS EL ARCHIVO ACÁ

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
          <Card className="p-3 border-0 shadow-sm" style={{ borderRadius: '20px', background: '#242f41', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Table responsive borderless variant="dark" className="mb-0 align-middle">
              <thead>
                <tr style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th className="px-4">Cliente</th>
                  <th>Contacto</th>
                  <th>Ubicación</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map(c => (
                  <tr 
                    key={c.id} 
                    className="fila-hover border-bottom border-secondary border-opacity-25"
                    onClick={() => navigate(`/clientes/${c.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="px-4 py-3 d-flex align-items-center text-white fw-semibold">
                      <img 
                        src={`https://i.pravatar.cc/150?u=${c.id}`} 
                        style={{ width: '38px', height: '38px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover' }} 
                        alt="avatar" 
                      />
                      <span className="text-capitalize">{c.name?.firstname} {c.name?.lastname}</span>
                    </td>
                    <td className="py-3 text-white-50">{c.email}</td>
                    <td className="py-3 text-white-50 text-capitalize">{c.address?.city}</td>
                    <td className="text-center py-3">
                      <button className="btn-ver shadow-sm">VER PERFIL</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </Container>
    </div>
  );
};