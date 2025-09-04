import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFromLS, saveToLS } from '../services/storage';

const AuthContext = createContext();
const LS_KEY = 'wms_auth_v1';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => getFromLS(LS_KEY, false));

  useEffect(() => { saveToLS(LS_KEY, isLoggedIn); }, [isLoggedIn]);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
