import { createContext, useState, useEffect, useContext } from 'react';

export const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const adminGuardado = localStorage.getItem('sesionAdmin');
    return adminGuardado ? JSON.parse(adminGuardado) : null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('sesionAdmin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('sesionAdmin');
    }
  }, [admin]);

  const login = (datosUsuario) => {
    setAdmin(datosUsuario);
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};