import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addUser, getUserByEmail } from '../utils/storage';
import ToastMessage from '../components/ToastMessage';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }

    // Basic phone validation: digits, optional +, 7-15 chars
    const phoneDigits = formData.phone.replace(/[^\d+]/g, '');
    if (!/^\+?\d{7,15}$/.test(phoneDigits)) {
      setToast({ message: 'Enter a valid phone number', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    if (formData.password.length < 5) {
      setToast({ message: 'Password must be at least 5 characters', type: 'error' });
      return;
    }

    const existingUser = getUserByEmail(formData.email);
    if (existingUser) {
      setToast({ message: 'Email already registered', type: 'error' });
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: phoneDigits,
      password: formData.password
    };

    addUser(newUser);
    setToast({ message: 'Account created successfully!', type: 'success' });

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Sign up to book home services</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <FiUser /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>
              <FiPhone /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567"
            />
          </div>

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
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>
              <FiLock /> Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
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

export default UserSignup;
