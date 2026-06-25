import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';

export const Login = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('Soporte');
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;

    login({ name: name.trim(), sector });
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <style>
        {`
          /* IMAGEN DE FONDO */
          .bg-image-container {
            /* REEMPLAZA ESTA URL POR LA RUTA DE TU IMAGEN (ej: url('/assets/fondo.jpg')) */
            
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
          }
          
          /* Capa oscura sobre la imagen para que resalte el cuadro */
          .bg-overlay {
            background-color: rgba(0, 0, 0, 0.6);
            width: 100%;
            min-height: 100vh;
          }

          /* EFECTO CRISTAL (Glassmorphism) */
          .glass-card {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            color: white;
          }

          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* Estilos para inputs transparentes */
          .glass-input {
            background-color: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #fff !important;
          }
          
          .glass-input:focus {
            background-color: rgba(255, 255, 255, 0.15) !important;
            border-color: #fff !important;
            box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.1) !important;
          }

          /* --- FIX DE SUPERPOSICIÓN --- */
          /* Oculta el placeholder cuando NO está en foco para que no choque con el label */
          .glass-input:not(:focus)::placeholder {
            color: transparent !important;
          }
          /* Muestra el placeholder solo cuando haces clic en el input */
          .glass-input:focus::placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }

          /* Ajustes para el Floating Label con tema oscuro */
          .form-floating > label {
            color: rgba(255, 255, 255, 0.7);
          }
          .form-floating > .form-control:focus ~ label,
          .form-floating > .form-control:not(:placeholder-shown) ~ label,
          .form-floating > .form-select ~ label {
            color: #fff;
            background-color: transparent !important;
          }
          .form-floating > .form-control:focus ~ label::after,
          .form-floating > .form-control:not(:placeholder-shown) ~ label::after,
          .form-floating > .form-select ~ label::after {
            background-color: transparent !important;
          }

          /* Las opciones del select no soportan transparencia en todos los navegadores, le damos fondo oscuro */
          .glass-select option {
            background-color: #212529;
            color: white;
          }

          .btn-glass {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            transition: all 0.3s ease;
          }
          .btn-glass:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            color: white;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>

      <div className="bg-image-container">
        <div className="bg-overlay d-flex align-items-center justify-content-center py-5">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} sm={10} md={8} lg={5}>
                <Card className="shadow-lg rounded-4 glass-card">
                  <Card.Body className="p-4 p-md-5">
                    
                    <div className="text-center mb-5">
                      <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" 
                        style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                      </div>
                      <h2 className="fw-bold mb-1">Acceso al Panel</h2>
                      <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Gestión y administración del sistema
                      </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      
                      <FloatingLabel
                        controlId="adminName"
                        label="Nombre del Administrador"
                        className="mb-4"
                      >
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej. María Gómez"
                          className="glass-input fw-semibold"
                          required
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="adminSector"
                        label="Sector de la Empresa"
                        className="mb-5"
                      >
                        <Form.Select 
                          value={sector} 
                          onChange={(e) => setSector(e.target.value)}
                          className="glass-input glass-select fw-semibold"
                        >
                          <option value="Soporte">Soporte IT</option>
                          <option value="Gerencia">Gerencia </option>
                        </Form.Select>
                      </FloatingLabel>

                      <Button 
                        type="submit" 
                        className="w-100 py-3 rounded-3 fw-bold text-uppercase btn-glass"
                      >
                        Ingresar
                      </Button>
                      
                    </Form>
                    
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

