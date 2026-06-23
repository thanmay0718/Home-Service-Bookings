import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <p className="footer-text">
          &copy; 2025 Home Services App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
