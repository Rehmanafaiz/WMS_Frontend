import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import SalesmenPage from './pages/SalesmenPage';
import TransactionsPage from './pages/TransactionsPage';
import AssignmentPage from './pages/AssignmentPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import { SettingsProvider } from './contexts/SettingsContext';
import { ProductProvider } from './contexts/ProductContext';
import { SalesmanProvider } from './contexts/SalesmanContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">WMS</Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/salesmen">Salesmen</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/assignments">Assignments</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/transactions">Transactions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
          </ul>
          {isLoggedIn && (
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <SettingsProvider>
          <ProductProvider>
            <SalesmanProvider>
              <TransactionProvider>
                <Router>
                  <Navbar />
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
                    <Route path="/salesmen" element={<PrivateRoute><SalesmenPage /></PrivateRoute>} />
                    <Route path="/assignments" element={<PrivateRoute><AssignmentPage /></PrivateRoute>} />
                    <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
                    <Route path="*" element={<div className="container py-4"><h2>404</h2><p>Page not found.</p></div>} />
                  </Routes>
                </Router>
              </TransactionProvider>
            </SalesmanProvider>
          </ProductProvider>
        </SettingsProvider>
      </AuthProvider>
    </UserProvider>
  );
}
export default App;
