import React from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import { useProducts } from '../contexts/ProductContext';
import { useSalesmen } from '../contexts/SalesmanContext';
import ExportCSV from '../components/ExportCSV';

const typeLabel = (tx) => {
  switch(tx.type){
    case 'ASSIGN': return 'Assignment';
    case 'ADJUST': return 'Adjustment';
    default: return tx.type || 'Other';
  }
};

const TransactionsPage = () => {
  const { transactions } = useTransactions();
  const { products } = useProducts();
  const { salesmen } = useSalesmen();

  const productMap = Object.fromEntries(products.map(p => [p.id, p]));
  const salesmanMap = Object.fromEntries(salesmen.map(s => [s.id, s]));

  return (
    <div className="container py-4">
      <h2>Transactions</h2>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Transactions</span>
          <ExportCSV data={transactions} filename="transactions.csv" columns={[{key:'id',label:'ID'},{key:'ts',label:'Time'},{key:'type',label:'Type'},{key:'productId',label:'Product'},{key:'salesmanId',label:'Salesman'},{key:'qty',label:'Qty'},{key:'note',label:'Note'},{key:'refId',label:'Ref'}]} />
        </div>
        <div className="table-responsive" style={{ maxHeight: '70vh' }}>
          <table className="table table-sm table-hover mb-0">
            <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Product</th>
                <th>Salesman</th>
                <th>Qty</th>
                <th>Note</th>
                <th>Ref</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td>{new Date(t.ts).toLocaleString()}</td>
                  <td>{typeLabel(t)}</td>
                  <td>{t.productId} {productMap[t.productId]? `- ${productMap[t.productId].name}`:''}</td>
                  <td>{t.salesmanId} {salesmanMap[t.salesmanId]? `- ${salesmanMap[t.salesmanId].name}`:''}</td>
                  <td className={t.qty < 0 ? 'text-danger' : 'text-success'}>{t.qty}</td>
                  <td>{t.note || ''}</td>
                  <td>{t.refId || ''}</td>
                </tr>
              ))}
              {transactions.length === 0 && <tr><td colSpan="7" className="text-center py-4 text-muted">No transactions yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
