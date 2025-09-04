import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { loadSalesmen, createSalesman, updateSalesman, deleteSalesman } from '../services/salesmen';

const SalesmanContext = createContext();

export const SalesmanProvider = ({ children }) => {
  const [salesmen, setSalesmen] = useState(() => loadSalesmen());

  const addSalesman = useCallback((item) => setSalesmen(prev => createSalesman(prev, item)), []);
  const editSalesman = useCallback((id, updates) => setSalesmen(prev => updateSalesman(prev, id, updates)), []);
  const removeSalesman = useCallback((id) => { if(window.confirm('Delete this salesman?')) setSalesmen(prev => deleteSalesman(prev, id)); }, []);

  const value = useMemo(() => ({ salesmen, addSalesman, editSalesman, removeSalesman }), [salesmen, addSalesman, editSalesman, removeSalesman]);
  return <SalesmanContext.Provider value={value}>{children}</SalesmanContext.Provider>;
};

export const useSalesmen = () => useContext(SalesmanContext);
