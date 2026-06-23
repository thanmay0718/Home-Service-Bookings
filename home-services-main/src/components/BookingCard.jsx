import { FiTrash2, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking, onCancel, onStatusChange, isAdmin = false }) => {
  const navigate = useNavigate();
  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3>{booking.service}</h3>
        <span className={`status-badge ${booking.status.toLowerCase()}`}>
          {booking.status === 'Pending' ? <FiClock /> : <FiCheckCircle />}
          {booking.status}
        </span>
      </div>
      <div className="booking-details">
        <p><strong>Date:</strong> {booking.date}</p>
        {isAdmin && <p><strong>User:</strong> {booking.userEmail}</p>}
        {booking.price && <p><strong>Price:</strong> ₹{booking.price}</p>}
      </div>
      <div className="booking-actions">
        <button className="btn btn-secondary" onClick={() => navigate(`/booking/${booking.id}`)}>
          View Details
        </button>
        {isAdmin && booking.status === 'Pending' && (
          <button
            className="btn btn-success"
            onClick={() => onStatusChange(booking.id, 'Completed')}
          >
            Mark Complete
          </button>
        )}
        {isAdmin ? (
          <button className="btn btn-danger" onClick={() => onCancel(booking.id)}>
            <FiTrash2 /> Delete
          </button>
        ) : (
          booking.status !== 'Completed' && (
            <button className="btn btn-danger" onClick={() => onCancel(booking.id)}>
              <FiTrash2 /> Cancel
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BookingCard;
