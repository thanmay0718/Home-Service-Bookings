import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initializeStorage } from './utils/storage';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import UserDashboard from './pages/UserDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/Policy';
import BookingDetails from './pages/BookingDetails';
import BookService from './pages/BookService';

/**
 * Protected Route Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.adminOnly] - Whether route requires admin access
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return null; // wait for auth hydration to avoid incorrect redirects on refresh
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

function AppContent() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/book/:serviceId"
            element={
              <ProtectedRoute>
                <BookService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
