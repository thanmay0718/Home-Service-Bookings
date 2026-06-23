import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServices, getUserBookings, addBooking, deleteBooking, updateUser, getUserByEmail } from '../utils/storage';
import ServiceCard from '../components/ServiceCard';
import BookingCard from '../components/BookingCard';
import ToastMessage from '../components/ToastMessage';
import { FiUser, FiPackage, FiCalendar, FiHeart, FiBell, FiSettings, FiStar, FiTrendingUp, FiClock } from 'react-icons/fi';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to our platform!', time: '2 hours ago', read: false },
    { id: 2, message: 'Your booking has been confirmed', time: '1 day ago', read: true },
    { id: 3, message: 'New services available in your area', time: '3 days ago', read: true }
  ]);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });

  useEffect(() => {
    loadData();
  }, [currentUser]);

  // Sync active tab with ?tab= query param and keep URL updated
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestedTab = params.get('tab');
    const validTabs = ['services','bookings','favorites','notifications','profile','settings'];
    if (requestedTab && validTabs.includes(requestedTab) && requestedTab !== activeTab) {
      setActiveTab(requestedTab);
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') !== activeTab) {
      params.set('tab', activeTab);
      navigate({ pathname: '/user-dashboard', search: params.toString() }, { replace: true });
    }
  }, [activeTab]);

  const loadData = () => {
    setServices(getServices());
    if (currentUser?.email) {
      setBookings(getUserBookings(currentUser.email));
    }
  };

  const handleBookService = (service) => {
    navigate(`/book/${service.id}`);
  };

  const handleCancelBooking = (id) => {
    deleteBooking(id);
    loadData();
    setToast({ message: 'Booking cancelled', type: 'success' });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser(currentUser.email, { 
      name: profileData.name,
      phone: profileData.phone,
      address: profileData.address
    });
    setToast({ message: 'Profile updated successfully!', type: 'success' });
  };

  const handleToggleFavorite = (service) => {
    const isFavorite = favorites.find(fav => fav.id === service.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== service.id));
      setToast({ message: 'Removed from favorites', type: 'success' });
    } else {
      setFavorites([...favorites, service]);
      setToast({ message: 'Added to favorites', type: 'success' });
    }
  };

  const handleMarkNotificationRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getStats = () => {
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const totalSpent = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);
    
    return { totalBookings, completedBookings, pendingBookings, totalSpent };
  };

  const stats = getStats();

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {currentUser?.name}!</h1>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FiPackage /> Available Services
          </button>
          <button
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FiCalendar /> My Bookings
          </button>
          <button
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FiHeart /> Favorites
          </button>
          <button
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FiBell /> Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
            )}
          </button>
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings /> Settings
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'services' && (
            <div className="services-section">
              <div className="section-header">
                <h2>Book a Service</h2>
                <div className="stats-row">
                  <div className="stat-card clickable" onClick={() => setActiveTab('bookings')} title="View bookings">
                    <FiTrendingUp />
                    <span>Total Bookings: {stats.totalBookings}</span>
                  </div>
                  <div className="stat-card clickable" onClick={() => setActiveTab('bookings')} title="View pending bookings">
                    <FiClock />
                    <span>Pending: {stats.pendingBookings}</span>
                  </div>
                  <div className="stat-card clickable" onClick={() => setActiveTab('bookings')} title="View completed bookings">
                    <FiStar />
                    <span>Completed: {stats.completedBookings}</span>
                  </div>
                </div>
              </div>
              <div className="services-grid">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onBook={handleBookService}
                    showFavoriteButton={true}
                    isFavorite={favorites.find(fav => fav.id === service.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>My Bookings</h2>
              {bookings.length === 0 ? (
                <p className="empty-message">No bookings yet. Book a service to get started!</p>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancelBooking}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              <h2>My Favorites</h2>
              {favorites.length === 0 ? (
                <p className="empty-message">No favorite services yet. Add some services to your favorites!</p>
              ) : (
                <div className="services-grid">
                  {favorites.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onBook={handleBookService}
                      showFavoriteButton={true}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-section">
              <h2>Notifications</h2>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => handleMarkNotificationRead(notification.id)}
                  >
                    <div className="notification-content">
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Profile Settings</h2>
              <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    rows="3"
                    placeholder="Enter your full address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <div className="settings-grid">
                <div className="setting-card">
                  <h3>Privacy Settings</h3>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Show my profile to service providers
                    </label>
                  </div>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Allow notifications for new services
                    </label>
                  </div>
                </div>
                <div className="setting-card">
                  <h3>Preferences</h3>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Email notifications
                    </label>
                  </div>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" />
                      SMS notifications
                    </label>
                  </div>
                </div>
                <div className="setting-card">
                  <h3>Data & Security</h3>
                  <button className="btn btn-secondary">Change Password</button>
                  <button className="btn btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
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

export default UserDashboard;
