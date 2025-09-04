import React, { useState, useMemo } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useSalesmen } from '../contexts/SalesmanContext';
import { useTransactions } from '../contexts/TransactionContext';
// (Unused imports removed)

// NOTE: For simplicity using product context setter pattern via temporary manual update (could refactor into ProductContext API)

const AssignmentPage = () => {
  const { products, editProduct } = useProducts();
  const { salesmen } = useSalesmen();
  const { log } = useTransactions();
  const [salesmanId, setSalesmanId] = useState('');
  const [lines, setLines] = useState([{ productId: '', qty: '' }]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const productMap = useMemo(()=>Object.fromEntries(products.map(p=>[p.id,p])),[products]);

  const addLine = () => setLines(ls => [...ls, { productId: '', qty: '' }]);
  const updateLine = (i, patch) => setLines(ls => ls.map((l,idx)=> idx===i? { ...l, ...patch }: l));
  const removeLine = (i) => setLines(ls => ls.filter((_,idx)=>idx!==i));

  const validate = () => {
    if(!salesmanId) return 'Select a salesman';
    if(!lines.length) return 'Add at least one product line';
    for(const l of lines){
      if(!l.productId) return 'Each line must have a product';
      const qty = parseInt(l.qty,10);
      if(!qty || qty <= 0) return 'Quantity must be > 0';
      const prod = productMap[l.productId];
      if(!prod) return 'Invalid product selected';
      if(qty > prod.stock) return `Qty for ${prod.name} exceeds stock`; 
    }
    return '';
  };

  const submit = (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const v = validate();
    if(v){ setError(v); return; }
    // Apply deduction and log transactions
    lines.forEach(l => {
      const qty = parseInt(l.qty,10);
      editProduct(l.productId, { stock: productMap[l.productId].stock - qty });
      log({ type: 'ASSIGN', productId: l.productId, salesmanId, qty: -qty, note: note || 'Assignment', refId: salesmanId });
    });
    setSuccess('Assignment completed');
    setLines([{ productId: '', qty: '' }]);
    setNote('');
  };

  return (
    <div className="container py-4">
      <h2>Assignments</h2>
      <form onSubmit={submit} className="card mb-4">
        <div className="card-body">
          {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
          {success && <div className="alert alert-success py-2 mb-3">{success}</div>}
          <div className="mb-3">
            <label className="form-label">Salesman</label>
            <select className="form-select" value={salesmanId} onChange={e=>setSalesmanId(e.target.value)} required>
              <option value="">Select...</option>
              {salesmen.map(s => <option key={s.id} value={s.id}>{s.name} ({s.region})</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Lines</label>
            <div className="d-flex flex-column gap-2">
              {lines.map((l,idx) => (
                <div key={idx} className="d-flex gap-2 align-items-start">
                  <select className="form-select" style={{ maxWidth: 180 }} value={l.productId} onChange={e=>updateLine(idx,{ productId: e.target.value })} required>
                    <option value="">Product...</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock {p.stock})</option>)}
                  </select>
                  <input type="number" min="1" step="5" className="form-control" style={{ maxWidth: 120 }} value={l.qty} placeholder="Qty" onChange={e=>updateLine(idx,{ qty: e.target.value })} required />
                  <button type="button" className="btn btn-outline-danger" onClick={()=>removeLine(idx)} disabled={lines.length===1}>Remove</button>
                </div>
              ))}
              <div>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addLine}>+ Add Line</button>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Note (optional)</label>
            <textarea className="form-control" rows={2} value={note} onChange={e=>setNote(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit">Assign Stock</button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentPage;
