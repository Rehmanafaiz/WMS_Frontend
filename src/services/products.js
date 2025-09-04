// products.js - product data service with mock seed + CRUD
import { getFromLS, saveToLS } from './storage';

const LS_KEY = 'wms_products_v1';

const seedProducts = () => {
  return [
    { id: 'P1001', name: 'Basmati Rice', category: 'Food', stock: 120, sku: 'BAS-RICE', createdAt: Date.now() - 86400000 },
    { id: 'P1002', name: 'Pakistani Mango', category: 'Fruit', stock: 45, sku: 'PK-MANGO', createdAt: Date.now() - 76000000 },
    { id: 'P1003', name: 'Surgical Mask', category: 'Medical', stock: 80, sku: 'SURG-MASK', createdAt: Date.now() - 65000000 },
    { id: 'P1004', name: 'Football Sialkot', category: 'Sports', stock: 300, sku: 'FB-SIAL', createdAt: Date.now() - 54000000 },
    { id: 'P1005', name: 'Multani Mitti', category: 'Beauty', stock: 50, sku: 'MULT-MITTI', createdAt: Date.now() - 43000000 },
    { id: 'P1006', name: 'Ajrak Shawl', category: 'Textile', stock: 200, sku: 'AJRAK-SHWL', createdAt: Date.now() - 32000000 },
    { id: 'P1007', name: 'Peshawari Chappal', category: 'Footwear', stock: 60, sku: 'PESH-CHAP', createdAt: Date.now() - 21000000 },
    { id: 'P1008', name: 'Karachi Biscuits', category: 'Food', stock: 25, sku: 'KHI-BISC', createdAt: Date.now() - 19000000 },
    { id: 'P1009', name: 'Sohan Halwa', category: 'Sweet', stock: 140, sku: 'SOHAN-HAL', createdAt: Date.now() - 11000000 },
    { id: 'P1010', name: 'Truck Art Mug', category: 'Gift', stock: 75, sku: 'TRUCK-MUG', createdAt: Date.now() - 5000000 }
  ];
};

export const loadProducts = () => {
  let data = getFromLS(LS_KEY, null);
  if (!data) {
    data = seedProducts();
    saveToLS(LS_KEY, data);
  }
  return data;
};

export const saveProducts = (products) => {
  saveToLS(LS_KEY, products);
};

export const createProduct = (products, product) => {
  const newProduct = { ...product, id: generateId(products), createdAt: Date.now() };
  const next = [...products, newProduct];
  saveProducts(next);
  return next;
};

export const updateProduct = (products, id, updates) => {
  const next = products.map(p => p.id === id ? { ...p, ...updates } : p);
  saveProducts(next);
  return next;
};

export const deleteProduct = (products, id) => {
  const next = products.filter(p => p.id !== id);
  saveProducts(next);
  return next;
};

const generateId = (products) => {
  // simple incremental id based on max numeric part
  const base = products.map(p => parseInt(p.id.replace(/\D/g, ''), 10)).filter(n => !isNaN(n));
  const max = base.length ? Math.max(...base) : 1000;
  return 'P' + (max + 1);
};
