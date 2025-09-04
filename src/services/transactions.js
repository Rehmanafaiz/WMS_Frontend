import { getFromLS, saveToLS } from './storage';

const LS_KEY = 'wms_transactions_v1';

export const loadTransactions = () => getFromLS(LS_KEY, []);
export const saveTransactions = (tx) => saveToLS(LS_KEY, tx);

// addTransaction(list, {type:'ASSIGN', productId, salesmanId, qty, note, refId })
export const addTransaction = (list, tx) => {
  const newTx = { id: genId(list), ts: Date.now(), ...tx };
  const next = [newTx, ...list]; // newest first
  saveTransactions(next);
  return next;
};

const genId = (list) => {
  const max = list.reduce((m, t) => Math.max(m, parseInt(String(t.id).replace(/\D/g,''),10) || 0), 0);
  return 'T' + (max + 1);
};
