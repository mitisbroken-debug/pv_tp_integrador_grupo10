import { useState, useEffect } from 'react';
import { Container, Table, Form, Spinner, Alert, Button, Card, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosForm, setDatosForm] = useState({ firstname: '', lastname: '', email: '', username: '', password: '' });
  const [estadoAlta, setEstadoAlta] = useState({ tipo: null, mensaje: '' });
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch('https://fakestoreapi.com/users');
        if (!respuesta.ok) throw new Error('Error de red');
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

  const handleAltaSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEstadoAlta({ tipo: null, mensaje: '' });

    try {
      const respuesta = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: datosForm.email,
          username: datosForm.username,
          password: datosForm.password,
          name: { firstname: datosForm.firstname, lastname: datosForm.lastname },
          address: { city: 'N/A', street: 'N/A', number: 0, zipcode: 'N/A', geolocation: { lat: '0', long: '0' } },
          phone: 'N/A'
        })
      });

      if (!respuesta.ok) throw new Error('Error en POST');
      const datos = await respuesta.json();
      
      setEstadoAlta({ tipo: 'success', mensaje: `¡Éxito! Cliente creado con el ID: ${datos.id}` });
      setTimeout(() => {
        setMostrarModal(false);
        setEstadoAlta({ tipo: null, mensaje: '' });
        setDatosForm({ firstname: '', lastname: '', email: '', username: '', password: '' });
      }, 3000);

    } catch (error) {
      setEstadoAlta({ tipo: 'danger', mensaje: 'Error al registrar el cliente.' });
    } finally {
      setEnviando(false);
    }
  };

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
        <Button variant="success" onClick={() => setMostrarModal(true)}>
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
        </div>
      )}

      {error && !cargando && (
        <Alert variant="danger" className="shadow-sm text-center">
          ¡Error de Sincronización! No pudimos conectar con el servidor.
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
                      <Button variant="outline-primary" size="sm" onClick={() => navigate(`/clientes/${cliente.id}`)}>
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-5">No hay resultados.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alta de Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {estadoAlta.tipo && <Alert variant={estadoAlta.tipo}>{estadoAlta.mensaje}</Alert>}
          <Form onSubmit={handleAltaSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={datosForm.firstname} onChange={(e) => setDatosForm({...datosForm, firstname: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" value={datosForm.lastname} onChange={(e) => setDatosForm({...datosForm, lastname: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={datosForm.email} onChange={(e) => setDatosForm({...datosForm, email: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" value={datosForm.username} onChange={(e) => setDatosForm({...datosForm, username: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={datosForm.password} onChange={(e) => setDatosForm({...datosForm, password: e.target.value})} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Guardar Cliente'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};