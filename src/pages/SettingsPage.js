import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useUsers } from '../contexts/UserContext';
import { saveSalesmen } from '../services/salesmen';
import { seedSalesmen } from '../services/salesmen';

const SettingsPage = () => {
  const { settings, updateSetting } = useSettings();
  const { users, register, deleteUser } = useUsers();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = e => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Username and password required');
      setSuccess('');
      return;
    }
    if (users.some(u => u.username === form.username)) {
      setError('Username already exists');
      setSuccess('');
      return;
    }
    register({ username: form.username, password: form.password });
    setSuccess('User added');
    setError('');
    setForm({ username: '', password: '' });
  };

  const handleDelete = username => {
    if (window.confirm('Delete user?')) {
      deleteUser(username);
      setSuccess('User deleted');
      setError('');
    }
  };

  const handleResetSalesmen = () => {
    saveSalesmen(seedSalesmen());
    window.location.reload();
  };

  return (
    <div className="container py-4">
      <h2>Settings</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Low Stock Threshold</label>
                <input type="number" min="1" className="form-control" value={settings.lowStockThreshold} onChange={e=>updateSetting('lowStockThreshold', parseInt(e.target.value,10)||1)} />
                <div className="form-text">Products below this stock show a Low badge.</div>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-primary mb-3" onClick={handleResetSalesmen}>Reset Salesmen Data</button>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">User Management</div>
            <div className="card-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-success py-2">{success}</div>}
              <form onSubmit={onSubmit} className="mb-3">
                <div className="mb-2">
                  <label className="form-label">Username</label>
                  <input name="username" className="form-control" value={form.username} onChange={onChange} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input name="password" type="password" className="form-control" value={form.password} onChange={onChange} required />
                </div>
                <button className="btn btn-primary w-100" type="submit">Add User</button>
              </form>
              <table className="table table-sm">
                <thead><tr><th>Username</th><th></th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.username}>
                      <td>{u.username}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.username)} disabled={u.username === 'admin'}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="form-text">Default user: admin / pakistan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
