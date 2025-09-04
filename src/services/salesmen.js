import { getFromLS, saveToLS } from './storage';

const LS_KEY = 'wms_salesmen_v1';

export const seedSalesmen = () => [
  { id: 'S1001', name: 'Hamza Tariq', region: 'Lahore', avatar: '', createdAt: Date.now() - 80000000 },
  { id: 'S1002', name: 'Ayesha Malik', region: 'Karachi', avatar: '', createdAt: Date.now() - 70000000 },
  { id: 'S1003', name: 'Usman Javed', region: 'Islamabad', avatar: '', createdAt: Date.now() - 60000000 },
  { id: 'S1004', name: 'Sara Qureshi', region: 'Multan', avatar: '', createdAt: Date.now() - 50000000 },
  { id: 'S1005', name: 'Ali Raza', region: 'Faisalabad', avatar: '', createdAt: Date.now() - 40000000 },
  { id: 'S1006', name: 'Hira Sheikh', region: 'Peshawar', avatar: '', createdAt: Date.now() - 30000000 },
  { id: 'S1007', name: 'Zain Shah', region: 'Quetta', avatar: '', createdAt: Date.now() - 20000000 },
  { id: 'S1008', name: 'Mariam Shafi', region: 'Hyderabad', avatar: '', createdAt: Date.now() - 10000000 }
];

export const loadSalesmen = () => {
  let data = getFromLS(LS_KEY, null);
  if (!data) {
    data = seedSalesmen();
    saveToLS(LS_KEY, data);
  }
  return data;
};

export const saveSalesmen = (salesmen) => saveToLS(LS_KEY, salesmen);

const nextId = (list) => {
  const nums = list.map(s => parseInt(s.id.replace(/\D/g,''),10)).filter(n=>!isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return 'S' + (max + 1);
};

export const createSalesman = (list, item) => {
  const newItem = { ...item, id: nextId(list), createdAt: Date.now(), avatar: item.avatar || '' };
  const next = [...list, newItem];
  saveSalesmen(next);
  return next;
};

export const updateSalesman = (list, id, updates) => {
  const next = list.map(s => s.id === id ? { ...s, ...updates } : s);
  saveSalesmen(next);
  return next;
};

export const deleteSalesman = (list, id) => {
  const next = list.filter(s => s.id !== id);
  saveSalesmen(next);
  return next;
};
