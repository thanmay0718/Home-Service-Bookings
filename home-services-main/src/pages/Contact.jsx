import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageCircle } from 'react-icons/fi';
import ToastMessage from '../components/ToastMessage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }

    // Simulate form submission
    setToast({ message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success' });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="page-container">
      <div className="contact-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p className="hero-subtitle">
              We're here to help! Get in touch with our team for any questions or support.
            </p>
          </div>
        </section>

        <section className="contact-section">
          <div className="section-container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                  Have questions about our services? Need help with your booking? 
                  Our customer support team is here to assist you every step of the way.
                </p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <FiMail className="contact-icon" />
                    <div>
                      <h3>Email Us</h3>
                      <p>support@homeservicesapp.com</p>
                      <p>info@homeservicesapp.com</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <FiPhone className="contact-icon" />
                    <div>
                      <h3>Call Us</h3>
                      <p>+1 (555) 123-4567</p>
                      <p>Mon-Fri: 8AM-8PM</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <FiMapPin className="contact-icon" />
                    <div>
                      <h3>Visit Us</h3>
                      <p>123 Service Street</p>
                      <p>Tech City, TC 12345</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <FiClock className="contact-icon" />
                    <div>
                      <h3>Business Hours</h3>
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                <div className="form-header">
                  <FiMessageCircle className="form-icon" />
                  <h2>Send us a Message</h2>
                  <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows="5"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-large">
                    <FiSend /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="section-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How do I book a service?</h3>
                <p>
                  Simply browse our available services, select the one you need, 
                  choose your preferred date and time, and complete the booking process. 
                  You'll receive a confirmation email with all the details.
                </p>
              </div>
              <div className="faq-item">
                <h3>Are your service providers verified?</h3>
                <p>
                  Yes! All our service providers undergo thorough background checks, 
                  insurance verification, and skill assessments before joining our platform.
                </p>
              </div>
              <div className="faq-item">
                <h3>What if I need to cancel or reschedule?</h3>
                <p>
                  You can cancel or reschedule your booking up to 24 hours before 
                  the scheduled service time through your dashboard or by contacting support.
                </p>
              </div>
              <div className="faq-item">
                <h3>How do you handle payments?</h3>
                <p>
                  We use secure payment processing to handle all transactions. 
                  Payment is processed after the service is completed and you're satisfied with the work.
                </p>
              </div>
            </div>
          </div>
        </section>
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

export default Contact;
