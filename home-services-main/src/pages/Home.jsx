import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServices } from '../utils/storage';
import ServiceCard from '../components/ServiceCard';
import { FiCheckCircle, FiClock, FiShield, FiUsers, FiStar, FiMessageCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(getServices());
  }, []);

  const handleGetStarted = () => {
    if (currentUser) {
      navigate(isAdmin ? '/admin-dashboard' : '/user-dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleBookService = (service) => {
    if (currentUser && !isAdmin) {
      navigate('/user-dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMore = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };


  // If user is logged in, show full-screen welcome page
  if (currentUser) {
    return (
      <div className="home-page logged-in-home">
        <section className="hero-section logged-in-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome back, <span className="user-name">{currentUser.name || 'User'}</span>!
            </h1>
            <p className="hero-subtitle">
              Ready to book your next home service? Access your dashboard to manage bookings and explore our services.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large" onClick={() => navigate(isAdmin ? '/admin-dashboard' : '/user-dashboard')}>
                Go to Dashboard
              </button>
              <button className="btn btn-secondary btn-large" onClick={() => navigate('/user-dashboard')}>
                Browse Services
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // For non-logged-in users - marketing page without services
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Connecting You with Trusted Home Service Professionals
          </h1>
          <p className="hero-subtitle">
            Book reliable home services at your convenience with our secure and user-friendly platform
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={() => navigate('/signup')}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FiShield className="feature-icon" />
              <h3>Secure & Trusted</h3>
              <p>All service providers are verified professionals with background checks and insurance coverage.</p>
            </div>
            <div className="feature-card">
              <FiClock className="feature-icon" />
              <h3>24/7 Availability</h3>
              <p>Book services anytime, anywhere with our round-the-clock booking system and instant confirmations.</p>
            </div>
            <div className="feature-card">
              <FiStar className="feature-icon" />
              <h3>Quality Guaranteed</h3>
              <p>All services come with quality guarantees and customer satisfaction is our top priority.</p>
            </div>
            <div className="feature-card">
              <FiUsers className="feature-icon" />
              <h3>Expert Professionals</h3>
              <p>Connect with experienced, licensed professionals who specialize in their respective fields.</p>
            </div>
            <div className="feature-card">
              <FiMessageCircle className="feature-icon" />
              <h3>Real-time Communication</h3>
              <p>Stay connected with your service provider through our integrated messaging system.</p>
            </div>
            <div className="feature-card">
              <FiCheckCircle className="feature-icon" />
              <h3>Easy Booking Process</h3>
              <p>Simple, intuitive booking process with transparent pricing and flexible scheduling options.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up & Login</h3>
              <p>Create your account in minutes with our simple registration process. Choose between user or service provider account.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Browse & Select</h3>
              <p>Explore our comprehensive list of home services and select the one that meets your specific needs.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Book & Schedule</h3>
              <p>Choose your preferred time slot and book your service with instant confirmation and payment processing.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Get Service Done</h3>
              <p>Our verified professionals will arrive on time and complete your service with guaranteed quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-container">
          <h2 className="section-title">About Our Platform</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Our home services platform revolutionizes how you connect with professional service providers. 
                We've built a comprehensive ecosystem that ensures quality, reliability, and convenience for both 
                customers and service providers.
              </p>
              <p>
                With over 10,000+ verified professionals and 50,000+ completed services, we've established ourselves 
                as the leading platform for home service bookings. Our advanced matching algorithm connects you 
                with the right professional based on your location, service requirements, and preferences.
              </p>
              <p>
                We prioritize transparency, security, and customer satisfaction. Every service provider undergoes 
                rigorous verification, including background checks, insurance verification, and skill assessments. 
                Our platform also includes real-time tracking, secure payments, and comprehensive customer support.
              </p>
            </div>
            <div className="stats-container">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Verified Professionals</p>
              </div>
              <div className="stat">
                <h3>50,000+</h3>
                <p>Services Completed</p>
              </div>
              <div className="stat">
                <h3>4.8/5</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
