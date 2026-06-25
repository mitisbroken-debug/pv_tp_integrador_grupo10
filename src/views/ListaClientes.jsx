import { useState, useEffect } from 'react';
import { Container, Table, Spinner, Button, Card, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(data => { setClientes(data); setCargando(false); });
  }, []);

  const clientesFiltrados = clientes.filter(c => 
    c.name.firstname.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.name.lastname.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.address.city.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .modern-card { border-radius: 24px; border: none; background: white; box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
        .table-custom { border-collapse: separate; border-spacing: 0 12px; }
        .tr-row { background: white; transition: all 0.3s ease; }
        .tr-row:hover { background: #fdfdfd; transform: scale(1.005); }
        .action-btn { 
          background: #2d3436; color: white; border-radius: 8px; padding: 6px 18px; 
          border: none; font-weight: 600; transition: 0.4s ease; 
        }
        .action-btn:hover { background: #00b894; transform: translateY(-2px); }
        .search-input { 
          border-radius: 12px; padding: 15px 20px; border: 1px solid #e2e8f0; 
          background: #ffffff; color: #334155; font-size: 1rem;
        }
        .avatar { width: 35px; height: 35px; border-radius: 50%; margin-right: 12px; object-fit: cover; }
      `}</style>

      <Container>
        <div className="mb-5">
          <h2 className="fw-bolder" style={{ color: '#1e293b' }}>DIRECTORIO CLIENTES</h2>
          <p className="text-muted">Gestión de usuarios y perfiles</p>
        </div>

        <Form.Control 
          className="search-input mb-4 shadow-sm" 
          placeholder="🔍 Buscar por nombre, email o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {cargando ? (
          <div className="text-center py-5"><Spinner animation="border" variant="secondary" /></div>
        ) : (
          <Card className="modern-card p-3 border-0">
            <Table className="table-custom" responsive borderless>
              <thead>
                <tr style={{ color: '#94a3b8', fontSize: '0.70rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th className="px-4">Cliente</th>
                  <th>Contacto</th>
                  <th>Ubicación</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map(c => (
                  <tr key={c.id} className="tr-row">
                    <td className="px-4 py-3 fw-bold d-flex align-items-center">
                      <img src={`https://i.pravatar.cc/150?u=${c.id}`} className="avatar" alt="avatar" />
                      {c.name.firstname} {c.name.lastname}
                    </td>
                    <td className="py-3 text-muted">{c.email}</td>
                    <td className="py-3 text-muted">{c.address.city}</td>
                    <td className="text-center py-3">
                      <button className="action-btn" onClick={() => navigate(`/clientes/${c.id}`)}>VER PERFIL</button>
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