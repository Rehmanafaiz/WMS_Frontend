import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { loadTransactions, addTransaction } from '../services/transactions';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => loadTransactions());

  const log = useCallback((tx) => setTransactions(prev => addTransaction(prev, tx)), []);

  const value = useMemo(() => ({ transactions, log }), [transactions, log]);
  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

export const useTransactions = () => useContext(TransactionContext);
