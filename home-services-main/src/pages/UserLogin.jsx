import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUserByEmail } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { validateForm } from '../utils/validation';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiMail, FiLock } from 'react-icons/fi';

const UserLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form
    const validation = validateForm(formData, {
      required: ['email', 'password'],
      email: true
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = getUserByEmail(formData.email);

      if (!user || user.password !== formData.password) {
        setToast({ message: 'Invalid email or password', type: 'error' });
        setIsLoading(false);
        return;
      }

      login({ email: user.email, name: user.name, isAdmin: false });
      setToast({ message: 'Login successful!', type: 'success' });

      setTimeout(() => {
        navigate('/user-dashboard');
      }, 1000);
    } catch (error) {
      setToast({ message: 'Login failed. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to access your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <FiMail /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
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
              placeholder="Enter password"
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="small" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default UserLogin;
