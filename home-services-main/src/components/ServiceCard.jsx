import { FiTool, FiZap, FiWind, FiSettings, FiDroplet, FiSun, FiShield, FiHome, FiMonitor, FiHeart } from 'react-icons/fi';

const iconMap = {
  wrench: FiTool,
  zap: FiZap,
  sparkles: FiSettings,
  hammer: FiTool,
  paintbrush: FiSun,
  wind: FiWind
};

const imageMap = {
  wrench: 'https://images.unsplash.com/photo-1581091014534-00d6f86a1f3b?w=400&h=250&fit=crop&crop=center',
  zap: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400&h=250&fit=crop&crop=center',
  sparkles: 'https://images.unsplash.com/photo-1581574209461-227d2f2c88e3?w=400&h=250&fit=crop&crop=center',
  hammer: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=250&fit=crop&crop=center',
  paintbrush: 'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=400&h=250&fit=crop&crop=center',
  wind: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=250&fit=crop&crop=center'
};

// Service-specific images
const serviceImages = {
  'Plumbing': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop&crop=center',
  'Electrical': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&crop=center',
  'Cleaning': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&crop=center',
  'Carpentry': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=250&fit=crop&crop=center',
  'Painting': 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=250&fit=crop&crop=center',
  'AC Repair': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop&crop=center',
  'Appliance Repair': 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6d3?w=400&h=250&fit=crop&crop=center',
  'Pest Control': 'https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=400&h=250&fit=crop&crop=center',
  'Landscaping': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop&crop=center',
  'Roofing': 'https://images.unsplash.com/photo-1597008437705-3f06abbdece4?w=400&h=250&fit=crop&crop=center',
  'Flooring': 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=400&h=250&fit=crop&crop=center',
  'Security Systems': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8d5?w=400&h=250&fit=crop&crop=center'
};

const ServiceCard = ({ service, onBook, showBookButton = true, showFavoriteButton = false, isFavorite = false, onToggleFavorite }) => {
  const IconComponent = iconMap[service.icon] || FiTool;
  const serviceImage = service.image || serviceImages[service.name] || imageMap[service.icon] || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=250&fit=crop&crop=center';

  return (
    <div className="service-card">
      <div className="service-image">
        <img src={serviceImage} alt={service.name} />
        <div className="service-overlay">
          <IconComponent size={40} className="service-overlay-icon" />
        </div>
        {showFavoriteButton && (
          <button 
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(service);
            }}
          >
            <FiHeart />
          </button>
        )}
      </div>
      <div className="service-content">
        <h3>{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <p className="service-price">₹{service.price}</p>
        {showBookButton && (
          <button className="btn btn-primary" onClick={() => onBook(service)}>
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
