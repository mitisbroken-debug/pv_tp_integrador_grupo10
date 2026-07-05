import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';

export const BotonEliminar = ({ idCliente, onEliminar }) => {
  const { admin } = useAdmin();
  const [showModal, setShowModal] = useState(false);

  const handleEliminar = (e) => {
    e.stopPropagation();

    if (admin?.sector !== 'Gerencia') return;

    setShowModal(true);
  };

  const confirmarEliminacion = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`https://fakestoreapi.com/users/${idCliente}`, { method: 'DELETE' });
      if (res.ok) {
        onEliminar(idCliente);
      }
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  if (admin?.sector !== 'Gerencia') return null;

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        className="btn-delete-icon"
        onClick={handleEliminar}
        title="Eliminar cliente"
        aria-label="Eliminar cliente"
      >
        <FaTrashAlt />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          className="border-0 pb-0 justify-content-center text-center"
          style={{ background: 'linear-gradient(135deg, #2a3548 0%, #1f2a3b 100%)', color: 'white', borderRadius: '0.5rem 0.5rem 0 0' }}
        >
          <Modal.Title className="fw-bold w-100 text-center">Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3" style={{ background: '#f7f9fc', borderRadius: '0 0 0.5rem 0.5rem' }}>
          <div className="text-center py-2">
            <div className="mb-3" style={{ fontSize: '2rem', color: '#d9534f' }}>
              <FaTrashAlt />
            </div>
            <p className="mb-0 fw-semibold" style={{ color: '#243447' }}>
              ¿Deseas eliminar este cliente?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center" style={{ background: '#f7f9fc', borderRadius: '0 0 0.5rem 0.5rem' }}>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminacion}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};