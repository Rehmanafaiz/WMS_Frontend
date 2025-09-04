import React, { useState, useEffect } from 'react';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import { ProductProvider, useProducts } from '../contexts/ProductContext';
import { useSettings } from '../contexts/SettingsContext';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import SortControl from '../components/SortControl';
import ExportCSV from '../components/ExportCSV';

const ProductListInner = () => {
  const { products, addProduct, removeProduct } = useProducts();
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', category: '', stock: '', sku: '' });
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [confirm, setConfirm] = useState({ show: false, id: null });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('created_desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // Stock alert logic
  const [alerted, setAlerted] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const lowStockThreshold = settings?.lowStockThreshold || 10;
  useEffect(() => {
    const lowStock = products.filter(p => Number(p.stock) <= lowStockThreshold && !alerted.includes(p.id));
    if (lowStock.length > 0) {
      setAlerted(alerted.concat(lowStock.map(p => p.id)));
      setShowAlert(true);
      // Here you could trigger email/SMS notification
    }
  }, [products, alerted, lowStockThreshold]);
  const handleCloseAlert = () => setShowAlert(false);

  // Filtering, sorting, and pagination logic
  const filtered = products.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!category || p.category === category)
  );
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'name_asc': return a.name.localeCompare(b.name);
      case 'name_desc': return b.name.localeCompare(a.name);
      case 'stock_asc': return a.stock - b.stock;
      case 'stock_desc': return b.stock - a.stock;
      case 'created_asc': return a.createdAt - b.createdAt;
      case 'created_desc': return b.createdAt - a.createdAt;
      default: return 0;
    }
  });
  const total = sorted.length;
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Handlers
  const handleDelete = id => {
    setConfirm({ show: true, id });
  };
  const confirmDelete = () => {
    removeProduct(confirm.id);
    setConfirm({ show: false, id: null });
    setToast({ message: 'Product deleted', type: 'success' });
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Stock Alert!</strong> Some products are low in stock (≤ {lowStockThreshold}).
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-md-4">
          <form onSubmit={e => {
            e.preventDefault();
            if (!form.name || !form.category) {
              setToast({ message: 'Name and Category required', type: 'danger' });
              return;
            }
            addProduct(form);
            setForm({ name: '', category: '', stock: '', sku: '' });
            setToast({ message: 'Product added', type: 'success' });
          }} className="card card-body gap-2">
            <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="form-control" name="category" placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            <input className="form-control" name="stock" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
            <input className="form-control" name="sku" placeholder="SKU" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} />
            <button className="btn btn-primary w-100" type="submit">Add</button>
          </form>
        </div>
        <div className="col-md-8">
          <div className="card d-flex flex-column" style={{ minHeight: '400px' }}>
            <div className="card-header d-flex flex-wrap gap-2 align-items-center justify-content-between">
              <strong>Product List</strong>
              <div className="d-flex flex-wrap gap-2">
                <SearchBar onSearch={setSearch} />
                <CategoryFilter categories={categories} value={category} onChange={v => { setCategory(v); setPage(1); }} />
                <SortControl value={sort} onChange={setSort} />
                <ExportCSV data={filtered} filename="products.csv" columns={[{key:'id',label:'ID'},{key:'name',label:'Name'},{key:'category',label:'Category'},{key:'stock',label:'Stock'},{key:'sku',label:'SKU'}]} />
              </div>
            </div>
            <div className="card-body flex-fill">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>SKU</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>{product.sku}</td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
              <Pagination total={total} pageSize={pageSize} currentPage={page} onPageChange={setPage} />
            </div>
          </div>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <ConfirmDialog show={confirm.show} message="Are you sure you want to delete this product?" onConfirm={confirmDelete} onCancel={() => setConfirm({ show: false, id: null })} />
    </div>
  );
}

const ProductList = () => {
  return (
    <ProductProvider>
      <ProductListInner />
    </ProductProvider>
  );
}

export default ProductList;
