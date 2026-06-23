import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiLogIn, FiLogOut, FiMenu, FiX, FiUser, FiCalendar, FiSettings, FiBell, FiBookmark, FiChevronDown } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ services: false, account: false });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
    setDropdownOpen({ services: false, account: false });
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleNavClick = (path, tab = null) => {
    if (tab) {
      navigate(`${path}?tab=${tab}`);
    } else {
      navigate(path);
    }
    setMenuOpen(false);
    setDropdownOpen({ services: false, account: false });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FiHome /> Home Services App
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Main">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} style={{ marginLeft: '8px' }}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ marginLeft: '8px' }}>Contact</Link>

          {currentUser ? (
            <>
              <button
                onClick={() => handleNavClick(isAdmin ? '/admin-dashboard' : '/user-dashboard', isAdmin ? 'analytics' : 'services')}
                className="nav-link-with-icon"
              >
                <FiHome /> Dashboard
              </button>
              
              {!isAdmin && (
                <div className="nav-dropdown">
                  <button 
                    className="nav-link-with-icon dropdown-trigger"
                    onClick={() => toggleDropdown('services')}
                  >
                    <FiCalendar /> My Services <FiChevronDown />
                  </button>
                  <div className={`nav-dropdown-content ${dropdownOpen.services ? 'show' : ''}`}>
                    <button onClick={() => handleNavClick('/user-dashboard', 'bookings')}>
                      <FiCalendar /> My Bookings
                    </button>
                    <button onClick={() => handleNavClick('/user-dashboard', 'favorites')}>
                      <FiBookmark /> Favorites
                    </button>
                  </div>
                </div>
              )}
              
              <div className="nav-dropdown">
                <button 
                  className="nav-link-with-icon dropdown-trigger"
                  onClick={() => toggleDropdown('account')}
                >
                  <FiUser /> Account <FiChevronDown />
                </button>
                <div className={`nav-dropdown-content ${dropdownOpen.account ? 'show' : ''}`}>
                  <button onClick={() => handleNavClick(isAdmin ? '/admin-dashboard' : '/user-dashboard', 'profile')}>
                    <FiUser /> Profile
                  </button>
                  <button onClick={() => handleNavClick(isAdmin ? '/admin-dashboard' : '/user-dashboard', 'settings')}>
                    <FiSettings /> Settings
                  </button>
                  <button onClick={handleLogout} className="logout-btn">
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => handleNavClick('/login')}>Login</button>
              <button onClick={() => handleNavClick('/signup')}>Sign Up</button>
              <button onClick={() => handleNavClick('/admin-login')} className="admin-login-btn">Admin Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
