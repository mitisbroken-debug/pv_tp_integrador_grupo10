import { Form, Button, Row, Col } from "react-bootstrap";

export const FormularioCliente = ({ handleSubmit, setDatos, datos }) => {
  const provincias = [
    "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
    "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
    "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"
  ].sort();

  const validarTexto = (e, campo) => {
    const valor = e.target.value;
    if (/^[A-Za-z\s]*$/.test(valor)) {
      const capitalizado = valor.length > 0 
        ? valor.charAt(0).toUpperCase() + valor.slice(1) 
        : "";
      setDatos({...datos, [campo]: capitalizado});
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 bg-white" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .modal-content, .modal-body, form {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        form label {
          color: #000000 !important;
        }
        form input, form select, .form-control, .form-select {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ced4da !important;
        }
        form input::placeholder {
          color: #6c757d !important;
        }
        form option {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
      `}</style>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Nombre</Form.Label>
            <Form.Control 
              type="text" 
              value={datos.nombre || ''} 
              onChange={(e) => validarTexto(e, 'nombre')} 
              required 
              style={{ borderRadius: '10px' }} 
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Apellido</Form.Label>
            <Form.Control 
              type="text" 
              value={datos.apellido || ''} 
              onChange={(e) => validarTexto(e, 'apellido')} 
              required 
              style={{ borderRadius: '10px' }} 
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Email</Form.Label>
        <Form.Control 
          type="email" 
          value={datos.email || ''} 
          onChange={(e) => setDatos({...datos, email: e.target.value})} 
          required 
          placeholder="nombre@dominio.com" 
          style={{ borderRadius: '10px' }} 
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Provincia</Form.Label>
        <Form.Select 
          value={datos.ciudad || ''} 
          onChange={(e) => setDatos({...datos, ciudad: e.target.value})} 
          required 
          style={{ borderRadius: '10px' }}
        >
          <option value="">Seleccione...</option>
          {provincias.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button 
        variant="success" 
        type="submit" 
        className="w-100 py-3 fw-bold shadow text-white border-0" 
        style={{ borderRadius: '12px', backgroundColor: '#198754' }}
      >
        CONFIRMAR REGISTRO
      </Button>
    </Form>
  );
};