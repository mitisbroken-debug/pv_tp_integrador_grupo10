import { Button } from 'react-bootstrap';
import { useAdmin } from '../../context/AdminContext';

export const BotonEliminar = ({ idCliente, onEliminar }) => {
  const { admin } = useAdmin();

  const handleEliminar = async (e) => {
    e.stopPropagation(); 

    if (!window.confirm("¿Estás seguro? Esta acción es irreversible.")) return;

    if (admin?.sector !== 'Gerencia') return;

    try {
      const res = await fetch(`https://fakestoreapi.com/users/${idCliente}`, { method: 'DELETE' });
      if (res.ok) {
        onEliminar(idCliente);
      }
    } catch (err) { alert("Error al eliminar"); }
  };

  if (admin?.sector !== 'Gerencia') return null;

  return (
    <Button variant="danger" size="sm" onClick={handleEliminar}>
      Eliminar
    </Button>
  );
};