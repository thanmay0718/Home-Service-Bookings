import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addBooking, getServices } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { validateForm } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';

const BookService = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    notes: '',
    scheduledDate: '',
    scheduledTime: '',
    address: currentUser?.address || '',
    phone: currentUser?.phone || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setServices(getServices());
  }, []);

  const service = useMemo(() => {
    return services.find(s => String(s.id) === String(serviceId));
  }, [services, serviceId]);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

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
    if (!service) return;
    
    setIsSubmitting(true);
    setErrors({});

    // Validate form
    const validation = validateForm(formData, {
      required: ['scheduledDate', 'scheduledTime', 'address', 'phone'],
      date: true,
      phone: true,
      address: true
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking = {
        userEmail: currentUser.email,
        service: service.name,
        price: service.price,
        notes: formData.notes,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        address: formData.address,
        phone: formData.phone
      };

      const created = addBooking(booking);
      navigate(`/booking/${created.id}`);
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service) {
    return (
      <div className="page-container">
        <div className="section-header">
          <h2>Service Not Found</h2>
          <button className="btn btn-secondary" onClick={() => navigate('/user-dashboard?tab=services')}>Back to Services</button>
        </div>
        <p className="empty-message">We couldn't find the selected service. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h2>Book Service</h2>
          <p className="section-subtitle">Provide your scheduling and contact details to confirm your booking.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/user-dashboard?tab=services')}>Back to Services</button>
      </div>

      <div className="details-card" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Date</label>
              <input
                type="date"
                name="scheduledDate"
                min={today}
                value={formData.scheduledDate}
                onChange={handleChange}
                className={errors.scheduledDate ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.scheduledDate && <span className="field-error">{errors.scheduledDate}</span>}
            </div>
            <div className="form-group">
              <label>Scheduled Time</label>
              <input
                type="time"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                className={errors.scheduledTime ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.scheduledTime && <span className="field-error">{errors.scheduledTime}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Service Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House No, Street, City, PIN"
              className={errors.address ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className={errors.phone ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Describe the issue or special instructions"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Estimated Price</label>
              <input type="text" value={`₹${service.price}`} readOnly />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" />
                Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>

        <aside className="summary-card" style={{ alignSelf: 'start' }}>
          <div className="section-header" style={{ padding: 0, marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Service Summary</h3>
          </div>
          <div className="booking-summary">
            <div className="details-row">
              <div className="details-item" style={{ flex: 1 }}>
                <label>Service</label>
                <div>{service.name}</div>
              </div>
              <div className="details-item">
                <label>Base Price</label>
                <div>₹{service.price}</div>
              </div>
            </div>
            <p className="service-description" style={{ marginTop: 8 }}>{service.description}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookService;


