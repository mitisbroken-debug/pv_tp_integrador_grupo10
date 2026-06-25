import { useState, useEffect } from 'react';
import { Container, Table, Spinner, Card, Form } from 'react-bootstrap';
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
        /* Animación suave de 0.3 segundos */
        .fila-hover { 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; 
        }
        
        /* Efecto fluido: cambia fondo, levanta la fila y pone sombra sutil */
        .fila-hover:hover { 
          background-color: #f1f5f9 !important; 
          transform: scale(1.01);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        
        .fila-hover td { background-color: transparent !important; }
        
        .btn-ver { 
          background: #2d3436; color: white; border-radius: 8px; padding: 6px 18px; 
          border: none; transition: all 0.3s ease; 
        }
        .btn-ver:hover { background-color: #00b894 !important; transform: scale(1.05); }
      `}</style>

      <Container className="text-center">
        <div className="mb-4">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '700', color: '#1e293b', fontSize: '2.8rem' }}>DIRECTORIO DE CLIENTES</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Gestión de usuarios y perfiles</p>
        </div>

        <Form.Control 
          className="shadow-sm mx-auto mb-4" 
          style={{ maxWidth: '600px', borderRadius: '12px', padding: '15px 20px', border: '1px solid #e2e8f0' }} 
          placeholder="Buscar por nombre, email o ciudad..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
        />

        {cargando ? (
          <div className="text-center py-5"><Spinner animation="border" /></div>
        ) : (
          <Card className="p-3 border-0 text-start shadow-sm" style={{ borderRadius: '24px', background: 'white' }}>
            <Table responsive borderless className="mb-0">
              <thead>
                <tr style={{ color: '#94a3b8', fontSize: '0.70rem', textTransform: 'uppercase' }}>
                  <th className="px-4">Cliente</th><th>Contacto</th><th>Ubicación</th><th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map(c => (
                  <tr 
                    key={c.id} 
                    className="fila-hover"
                    onClick={() => navigate(`/clientes/${c.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="px-4 py-3 d-flex align-items-center" style={{ color: '#1e293b', fontWeight: '700' }}>
                      <img src={"https://i.pravatar.cc/150?u=" + c.id} style={{ width: '35px', height: '35px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover' }} alt="avatar" />
                      {c.name.firstname} {c.name.lastname}
                    </td>
                    <td className="py-3 text-muted">{c.email}</td>
                    <td className="py-3 text-muted">{c.address.city}</td>
                    <td className="text-center py-3">
                      <button className="btn-ver">VER PERFIL</button>
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