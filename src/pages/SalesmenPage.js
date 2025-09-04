import React, { useState } from 'react';
import { useSalesmen } from '../contexts/SalesmanContext';

const SalesmenPage = () => {
  const { salesmen, addSalesman, removeSalesman } = useSalesmen();
  const [form, setForm] = useState({ name: '', region: '' });
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); if(!form.name) return; addSalesman({ name: form.name, region: form.region || 'General' }); setForm({ name: '', region: '' }); };
  return (
    <div className="container py-4">
      <h2>Salesmen</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Add Salesman</div>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input name="name" className="form-control" value={form.name} onChange={onChange} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Region</label>
                  <input name="region" className="form-control" value={form.region} onChange={onChange} />
                </div>
                <button className="btn btn-primary w-100" type="submit">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">List</div>
            <table className="table table-sm mb-0">
              <thead className="table-light"><tr><th>ID</th><th>Avatar</th><th>Name</th><th>Region</th><th></th></tr></thead>
              <tbody>
                {salesmen.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>
                      <div style={{width:32,height:32,borderRadius:'50%',background:'#e3eaf2',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',color:'#2c3e50',fontSize:16}}>
                        {s.name.split(' ').map(n=>n[0]).join('').toUpperCase()}
                      </div>
                    </td>
                    <td>{s.name}</td>
                    <td>{s.region}</td>
                    <td className="text-end"><button className="btn btn-sm btn-outline-danger" onClick={()=>removeSalesman(s.id)}>Delete</button></td>
                  </tr>
                ))}
                {salesmen.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">No salesmen yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesmenPage;
