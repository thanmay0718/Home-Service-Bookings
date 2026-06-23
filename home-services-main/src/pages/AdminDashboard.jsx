import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getServices, addService, updateService, deleteService, getBookings, deleteBooking, updateBookingStatus, getUsers, deleteUserByEmail } from '../utils/storage';
import BookingCard from '../components/BookingCard';
import ToastMessage from '../components/ToastMessage';
import { FiPackage, FiCalendar, FiPlus, FiEdit2, FiTrash2, FiUsers, FiTrendingUp, FiDollarSign, FiClock, FiUser, FiSettings } from 'react-icons/fi';
// AnalyticsChart removed per request

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    icon: 'wrench',
    image: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  // Sync active tab with ?tab= query param and keep URL updated
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestedTab = params.get('tab');
    const validTabs = ['analytics', 'services', 'bookings', 'users', 'profile', 'settings'];
    if (requestedTab && validTabs.includes(requestedTab) && requestedTab !== activeTab) {
      setActiveTab(requestedTab);
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') !== activeTab) {
      params.set('tab', activeTab);
      navigate({ pathname: '/admin-dashboard', search: params.toString() }, { replace: true });
    }
  }, [activeTab]);

  const loadData = () => {
    setServices(getServices());
    setBookings(getBookings());
    setUsers(getUsers());
  };

  const getAnalytics = () => {
    const totalUsers = users.length;
    const totalServices = services.length;
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    
    return {
      totalUsers,
      totalServices,
      totalBookings,
      totalRevenue,
      pendingBookings,
      completedBookings
    };
  };

  const analytics = getAnalytics();

  const chartData = {
    bookings: Array.from({ length: 6 }).map((_, i) => ({
      label: ['M1','M2','M3','M4','M5','M6'][i],
      value: bookings.filter(b => {
        const d = new Date(b.date);
        const now = new Date();
        const monthsDiff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
        return monthsDiff === (5 - i);
      }).length
    })),
    revenue: Array.from({ length: 6 }).map((_, i) => ({
      label: ['M1','M2','M3','M4','M5','M6'][i],
      value: bookings.reduce((sum, b) => {
        const d = new Date(b.date);
        const now = new Date();
        const monthsDiff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
        if (monthsDiff === (5 - i)) return sum + (b.price || 0);
        return sum;
      }, 0)
    }))
  };

  const handleServiceFormChange = (e) => {
    setServiceForm({
      ...serviceForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();

    if (!serviceForm.name || !serviceForm.description || !serviceForm.price) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }

    if (editingService) {
      updateService(editingService.id, {
        ...serviceForm,
        price: Number(serviceForm.price)
      });
      setToast({ message: 'Service updated successfully!', type: 'success' });
    } else {
      addService({
        ...serviceForm,
        price: Number(serviceForm.price)
      });
      setToast({ message: 'Service added successfully!', type: 'success' });
    }

    resetServiceForm();
    loadData();
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price,
      icon: service.icon,
      image: service.image || ''
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      loadData();
      setToast({ message: 'Service deleted', type: 'success' });
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      name: '',
      description: '',
      price: '',
      icon: 'wrench',
      image: ''
    });
    setEditingService(null);
    setShowServiceForm(false);
  };
  const handleDeleteUser = (email) => {
    if (window.confirm('Delete this user?')) {
      deleteUserByEmail(email);
      loadData();
      setToast({ message: 'User deleted', type: 'success' });
    }
  };

  const handleEditUser = (user) => {
    setToast({ message: 'User edit coming soon', type: 'success' });
  };

  const handleDeleteBooking = (id) => {
    deleteBooking(id);
    loadData();
    setToast({ message: 'Booking deleted', type: 'success' });
  };

  const handleStatusChange = (id, status) => {
    updateBookingStatus(id, status);
    loadData();
    setToast({ message: 'Booking status updated', type: 'success' });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FiTrendingUp /> Analytics
          </button>
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FiPackage /> Manage Services
          </button>
          <button
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FiCalendar /> Manage Bookings
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers /> Manage Users
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
          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <h2>Platform Analytics</h2>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <FiUsers />
                  <div>
                    <h3>{analytics.totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <FiPackage />
                  <div>
                    <h3>{analytics.totalServices}</h3>
                    <p>Available Services</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <FiCalendar />
                  <div>
                    <h3>{analytics.totalBookings}</h3>
                    <p>Total Bookings</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <FiDollarSign />
                  <div>
                    <h3>₹{analytics.totalRevenue}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <FiClock />
                  <div>
                    <h3>{analytics.pendingBookings}</h3>
                    <p>Pending Bookings</p>
                  </div>
                </div>
                <div className="analytics-card">
                  <FiTrendingUp />
                  <div>
                    <h3>{analytics.completedBookings}</h3>
                    <p>Completed Bookings</p>
                  </div>
                </div>
              </div>
              
              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="activity-item">
                      <div className="activity-content">
                        <p><strong>{booking.userEmail}</strong> booked <strong>{booking.service}</strong></p>
                        <span className="activity-time">{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className={`activity-status ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="admin-services-section">
              <div className="section-header">
                <h2>Services Management</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowServiceForm(!showServiceForm)}
                >
                  <FiPlus /> Add Service
                </button>
              </div>

              {showServiceForm && (
                <div className="service-form-container">
                  <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                  <form onSubmit={handleAddService} className="service-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Service Name</label>
                        <input
                          type="text"
                          name="name"
                          value={serviceForm.name}
                          onChange={handleServiceFormChange}
                          placeholder="e.g., Plumbing"
                        />
                      </div>
                      <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                          type="number"
                          name="price"
                          value={serviceForm.price}
                          onChange={handleServiceFormChange}
                          placeholder="299"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={serviceForm.description}
                        onChange={handleServiceFormChange}
                        placeholder="Service description"
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="url"
                        name="image"
                        value={serviceForm.image}
                        onChange={handleServiceFormChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="form-group">
                      <label>Icon</label>
                      <select
                        name="icon"
                        value={serviceForm.icon}
                        onChange={handleServiceFormChange}
                      >
                        <option value="wrench">Wrench</option>
                        <option value="zap">Lightning</option>
                        <option value="sparkles">Sparkles</option>
                        <option value="hammer">Hammer</option>
                        <option value="paintbrush">Paintbrush</option>
                        <option value="wind">Wind</option>
                      </select>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {editingService ? 'Update Service' : 'Add Service'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={resetServiceForm}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="services-table">
                {services.map((service) => (
                  <div key={service.id} className="service-row">
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <span className="price-tag">₹{service.price}</span>
                    </div>
                    <div className="service-actions">
                      <button
                        className="btn btn-icon"
                        onClick={() => handleEditService(service)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn btn-icon btn-danger"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>All Bookings</h2>
              {bookings.length === 0 ? (
                <p className="empty-message">No bookings yet</p>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleDeleteBooking}
                      onStatusChange={handleStatusChange}
                      isAdmin={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <h2>User Management</h2>
              <div className="users-table">
                {users.length === 0 ? (
                  <p className="empty-message">No users registered yet</p>
                ) : (
                  users.map((user) => (
                    <div key={user.email} className="user-row">
                      <div className="user-info">
                        <h3>{user.name || 'Unknown User'}</h3>
                        <p>{user.email}</p>
                        <span className="user-type">{user.isAdmin ? 'Admin' : 'User'}</span>
                      </div>
                      <div className="user-stats">
                        <span>Bookings: {bookings.filter(b => b.userEmail === user.email).length}</span>
                        <span>Total Spent: ₹{bookings.filter(b => b.userEmail === user.email).reduce((sum, b) => sum + (b.price || 0), 0)}</span>
                      </div>
                      <div className="user-actions">
                        <button className="btn btn-icon" onClick={() => handleEditUser(user)}>
                          <FiEdit2 />
                        </button>
                        <button className="btn btn-icon btn-danger" onClick={() => handleDeleteUser(user.email)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Admin Profile</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value="Admin" disabled />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value="admin@homeservices.com" disabled />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" value="Administrator" disabled />
                </div>
                <div className="form-group">
                  <label>Permissions</label>
                  <div className="permissions-list">
                    <span className="permission-tag">Manage Services</span>
                    <span className="permission-tag">Manage Users</span>
                    <span className="permission-tag">View Analytics</span>
                    <span className="permission-tag">Manage Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Admin Settings</h2>
              <div className="settings-grid">
                <div className="setting-card">
                  <h3>Platform Settings</h3>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Enable new user registrations
                    </label>
                  </div>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Auto-approve service providers
                    </label>
                  </div>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" />
                      Require email verification
                    </label>
                  </div>
                </div>
                <div className="setting-card">
                  <h3>Notification Settings</h3>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Email notifications for new bookings
                    </label>
                  </div>
                  <div className="setting-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Weekly analytics reports
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
                  <h3>Security</h3>
                  <button className="btn btn-secondary">Change Admin Password</button>
                  <button className="btn btn-secondary">View Login History</button>
                  <button className="btn btn-danger">Reset All Data</button>
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

export default AdminDashboard;
