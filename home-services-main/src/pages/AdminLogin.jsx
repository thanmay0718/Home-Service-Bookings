import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ToastMessage from '../components/ToastMessage';
import { FiUser, FiLock, FiShield } from 'react-icons/fi';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }

    if (formData.username === 'admin' && formData.password === 'admin123') {
      login({
        email: 'admin@homeservices.com',
        name: 'Admin',
        isAdmin: true
      });
      setToast({ message: 'Admin login successful!', type: 'success' });

      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1000);
    } else {
      setToast({ message: 'Invalid admin credentials', type: 'error' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container admin-container">
        <div className="admin-badge">
          <FiShield size={40} />
        </div>
        <h1>Admin Portal</h1>
        <p className="auth-subtitle">Secure access for administrators</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <FiUser /> Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter admin username"
            />
          </div>

          <div className="form-group">
            <label>
              <FiLock /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Login as Admin
          </button>
        </form>

        <p className="auth-footer admin-hint">
          Default credentials: admin / admin123
        </p>
      </div>

      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminLogin;
