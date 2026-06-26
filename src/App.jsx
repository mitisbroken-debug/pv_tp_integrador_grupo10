import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/layout/Header';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { ListaClientes } from './views/ListaClientes';
import { DetalleCliente } from './views/DetalleCliente';

const RutaPrivada = ({ children }) => {
  const { admin } = useAdmin();
  if (!admin) return <Navigate to="/login" replace />;
  return children;
};

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
        <Route path="/clientes" element={<RutaPrivada><ListaClientes /></RutaPrivada>} />
        <Route path="/clientes/:id" element={<RutaPrivada><DetalleCliente /></RutaPrivada>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;