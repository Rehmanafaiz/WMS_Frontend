import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const { users } = useUsers();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const found = users.find(u => u.username === user && u.password === pass);
    if (found) {
      login();
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try admin / pakistan or your registered user.');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card p-4" style={{ maxWidth: 350, width: '100%' }}>
        <h3 className="mb-3 text-center">Login</h3>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={user} onChange={e=>setUser(e.target.value)} required autoFocus />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={pass} onChange={e=>setPass(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <div className="mt-3 text-muted small">Example: admin / pakistan</div>
      </div>
    </div>
  );
};

export default LoginPage;
