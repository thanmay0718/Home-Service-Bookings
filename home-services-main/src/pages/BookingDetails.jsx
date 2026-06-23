import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookings, deleteBooking, updateBookingStatus } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

const BookingDetails = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const all = getBookings();
    const found = all.find(b => String(b.id) === String(id));
    setBooking(found || null);
  }, [id]);

  if (!booking) {
    return (
      <div className="page-container">
        <div className="section-header">
          <h2>Booking Not Found</h2>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(isAdmin ? '/admin-dashboard?tab=bookings' : '/user-dashboard?tab=bookings')}
          >
            Back to Bookings
          </button>
        </div>
        <p className="empty-message">We could not find details for this booking. It may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-header">
        <div>
          <h2>Booking Details</h2>
          <p className="section-subtitle">Review {isAdmin ? 'and manage ' : ''}the booking information{isAdmin ? ' for this customer' : ''}.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {isAdmin && (
            <>
              {booking.status !== 'Completed' && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    updateBookingStatus(booking.id, 'Completed');
                    navigate('/admin-dashboard?tab=bookings');
                  }}
                >
                  Mark Complete
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('Delete this booking?')) {
                    deleteBooking(booking.id);
                    navigate('/admin-dashboard?tab=bookings');
                  }
                }}
              >
                Delete
              </button>
            </>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => navigate(isAdmin ? '/admin-dashboard?tab=bookings' : '/user-dashboard?tab=bookings')}
          >
            Back to Bookings
          </button>
        </div>
      </div>

      <div className="details-card">
        {/* Summary header */}
        <div className="details-row" style={{ alignItems: 'center', marginBottom: 8 }}>
          <div className="details-item" style={{ flex: 1 }}>
            <label>Service</label>
            <div style={{ fontWeight: 600 }}>{booking.service}</div>
          </div>
          <div className="details-item">
            <label>Status</label>
            <div>
              <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
            </div>
          </div>
          <div className="details-item">
            <label>Booking ID</label>
            <div style={{ fontFamily: 'monospace' }}>#{booking.id}</div>
          </div>
        </div>

        {/* Service & Pricing */}
        <h3 style={{ marginTop: 16, marginBottom: 8 }}>Service & Pricing</h3>
        <div className="details-row">
          <div className="details-item" style={{ flex: 1 }}>
            <label>Service Name</label>
            <div>{booking.service}</div>
          </div>
          {booking.price !== undefined && (
            <div className="details-item">
              <label>Quoted Price</label>
              <div>₹{booking.price}</div>
            </div>
          )}
        </div>

        {/* Customer */}
        <h3 style={{ marginTop: 16, marginBottom: 8 }}>Customer</h3>
        <div className="details-row">
          {booking.userEmail && (
            <div className="details-item" style={{ flex: 1 }}>
              <label>Email</label>
              <div>{booking.userEmail}</div>
            </div>
          )}
          {booking.phone && (
            <div className="details-item">
              <label>Phone</label>
              <div>{booking.phone}</div>
            </div>
          )}
        </div>

        {/* Schedule */}
        <h3 style={{ marginTop: 16, marginBottom: 8 }}>Schedule</h3>
        <div className="details-row">
          <div className="details-item">
            <label>Booked On</label>
            <div>{booking.date}</div>
          </div>
          {booking.scheduledDate && (
            <div className="details-item">
              <label>Scheduled Date</label>
              <div>{booking.scheduledDate}</div>
            </div>
          )}
          {booking.scheduledTime && (
            <div className="details-item">
              <label>Scheduled Time</label>
              <div>{booking.scheduledTime}</div>
            </div>
          )}
        </div>

        {/* Location */}
        {(booking.address || booking.phone) && (
          <>
            <h3 style={{ marginTop: 16, marginBottom: 8 }}>Location & Contact</h3>
            <div className="details-row">
              {booking.address && (
                <div className="details-item" style={{ flex: 1 }}>
                  <label>Service Address</label>
                  <div>{booking.address}</div>
                </div>
              )}
              {booking.phone && (
                <div className="details-item">
                  <label>Contact Phone</label>
                  <div>{booking.phone}</div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Notes */}
        {booking.notes && (
          <>
            <h3 style={{ marginTop: 16, marginBottom: 8 }}>Notes</h3>
            <div className="details-row">
              <div className="details-item" style={{ flex: 1 }}>
                <label>Additional Notes</label>
                <div>{booking.notes}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;


