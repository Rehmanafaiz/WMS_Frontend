import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { loadProducts, createProduct, updateProduct, deleteProduct } from '../services/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => loadProducts());

  const addProduct = useCallback((product) => {
    setProducts(prev => createProduct(prev, product));
  }, []);

  const editProduct = useCallback((id, updates) => {
    setProducts(prev => updateProduct(prev, id, updates));
  }, []);

  const removeProduct = useCallback((id) => {
    if (!window.confirm('Delete this product?')) return;
    setProducts(prev => deleteProduct(prev, id));
  }, []);

  const value = useMemo(() => ({ products, addProduct, editProduct, removeProduct }), [products, addProduct, editProduct, removeProduct]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
