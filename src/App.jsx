import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Header } from './components/layout/Header';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { ListaClientes } from './views/ListaClientes';
import { DetalleCliente } from './views/DetalleCliente';
import './App.css';

function ProtectedRoute({ children }) {
  const { admin } = useAdmin();
  return admin ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { admin } = useAdmin();

  return (
    <>
      {admin && <Header />}
      <main className="app-main">
        <Routes>
          <Route path="/login" element={admin ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/clientes" element={<ProtectedRoute><ListaClientes /></ProtectedRoute>} />
          <Route path="/clientes/:id" element={<ProtectedRoute><DetalleCliente /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={admin ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;