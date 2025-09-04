import React, { createContext, useContext, useState, useCallback } from 'react';
import { loadUsers, addUser, removeUser } from '../services/users';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => loadUsers());

  const register = useCallback((user) => {
    setUsers(prev => addUser(prev, user));
  }, []);

  const deleteUser = useCallback((username) => {
    setUsers(prev => removeUser(prev, username));
  }, []);

  return <UserContext.Provider value={{ users, register, deleteUser }}>{children}</UserContext.Provider>;
};

export const useUsers = () => useContext(UserContext);
