import React, { useMemo } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useTransactions } from '../contexts/TransactionContext';

const StatCard = ({ title, value, variant='primary' }) => (
  <div className="col-sm-6 col-lg-3">
    <div className={`card text-bg-${variant} mb-3`}>
      <div className="card-body">
        <h6 className="card-title text-uppercase small mb-1">{title}</h6>
        <div className="fs-4 fw-semibold">{value}</div>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { products } = useProducts();
  const { transactions } = useTransactions();

  const kpis = useMemo(() => {
    const totalSkus = products.length;
    const totalStock = products.reduce((s,p)=>s+p.stock,0);
    const lowStock = products.filter(p=>p.stock < 10).length; // threshold pending settings integration
    const weekAgo = Date.now() - 7*24*60*60*1000;
    const assignmentsThisWeek = transactions.filter(t => t.type==='ASSIGN' && t.ts >= weekAgo).length;
    return { totalSkus, totalStock, lowStock, assignmentsThisWeek };
  }, [products, transactions]);

  const recent = transactions.slice(0,10);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-3 mb-4">
        <StatCard title="Total SKUs" value={kpis.totalSkus} variant="primary" />
        <StatCard title="Total Stock" value={kpis.totalStock} variant="success" />
        <StatCard title="Low Stock" value={kpis.lowStock} variant="warning" />
        <StatCard title="Assignments (7d)" value={kpis.assignmentsThisWeek} variant="info" />
      </div>
      <div className="card">
        <div className="card-header">Recent Transactions</div>
        <div className="table-responsive" style={{ maxHeight: '50vh' }}>
          <table className="table table-sm mb-0">
            <thead className="table-light" style={{ position: 'sticky', top:0 }}>
              <tr><th>Time</th><th>Type</th><th>Product</th><th>Qty</th></tr>
            </thead>
            <tbody>
              {recent.map(r => (
                <tr key={r.id}>
                  <td>{new Date(r.ts).toLocaleString()}</td>
                  <td>{r.type}</td>
                  <td>{r.productId}</td>
                  <td className={r.qty < 0 ? 'text-danger':'text-success'}>{r.qty}</td>
                </tr>
              ))}
              {recent.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-muted">No transactions yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
