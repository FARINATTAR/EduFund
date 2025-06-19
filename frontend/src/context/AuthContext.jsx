// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const login = (user) => setAuthUser(user);
  const logout = () => setAuthUser(null);

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
