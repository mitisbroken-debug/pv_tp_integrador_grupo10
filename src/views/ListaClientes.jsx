import { useState, useEffect } from 'react';
import { Container, Table, Form, Spinner, Alert, Button, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch('https://fakestoreapi.com/users');
        
        if (!respuesta.ok) throw new Error('Error al conectar con la API');
        
        const datos = await respuesta.json();
        setClientes(datos);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter(cliente => {
    const termino = busqueda.toLowerCase();
    const apellido = cliente.name.lastname.toLowerCase();
    const ciudad = cliente.address.city.toLowerCase();
    
    return apellido.includes(termino) || ciudad.includes(termino);
  });

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Directorio de Clientes</h2>
        <Button variant="success" onClick={() => navigate('/clientes/nuevo')}>
          + Nuevo Cliente
        </Button>
      </div>

      <Card className="shadow-sm border-0 mb-4 p-3 bg-white">
        <InputGroup>
          <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Filtrar por apellido o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border-start-0 bg-light"
          />
        </InputGroup>
      </Card>

      {cargando && (
        <div className="text-center my-5 py-5">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted fw-bold">Sincronizando base de datos...</p>
        </div>
      )}

      {error && !cargando && (
        <Alert variant="danger" className="shadow-sm text-center">
          <Alert.Heading>¡Error de Sincronización!</Alert.Heading>
          <p className="mb-0">No pudimos conectar con el servidor. Revisá tu conexión a internet e intentá nuevamente.</p>
        </Alert>
      )}

      {!cargando && !error && (
        <Card className="shadow-sm border-0 overflow-hidden">
          <Table responsive hover striped className="mb-0 align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map(cliente => (
                  <tr key={cliente.id}>
                    <td className="fw-bold text-secondary">#{cliente.id}</td>
                    <td className="text-capitalize">{cliente.name.firstname} {cliente.name.lastname}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.phone}</td>
                    <td className="text-capitalize">{cliente.address.city}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/clientes/${cliente.id}`)}
                      >
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-5">
                    No se encontraron resultados para "{busqueda}".
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
};