export const initializeStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  if (!localStorage.getItem('services')) {
    const defaultServices = [
      {
        id: 1,
        name: 'Plumbing',
        description: 'Fix water leaks, pipes, and drainage issues',
        price: 299,
        icon: 'wrench',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 2,
        name: 'Electrical',
        description: 'Electrical repairs, wiring, and installations',
        price: 399,
        icon: 'zap',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 3,
        name: 'Cleaning',
        description: 'Professional home and office cleaning services',
        price: 199,
        icon: 'sparkles',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 4,
        name: 'Carpentry',
        description: 'Furniture repair and custom woodwork',
        price: 349,
        icon: 'hammer',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 5,
        name: 'Painting',
        description: 'Interior and exterior painting services',
        price: 499,
        icon: 'paintbrush',
        image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 6,
        name: 'AC Repair',
        description: 'Air conditioning maintenance and repair',
        price: 449,
        icon: 'wind',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 7,
        name: 'Appliance Repair',
        description: 'Fix washing machines, refrigerators, and other appliances',
        price: 379,
        icon: 'wrench',
        image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6d3?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 8,
        name: 'Pest Control',
        description: 'Professional pest control and extermination services',
        price: 329,
        icon: 'sparkles',
        image: 'https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 9,
        name: 'Landscaping',
        description: 'Garden design, lawn care, and outdoor maintenance',
        price: 549,
        icon: 'wind',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 10,
        name: 'Roofing',
        description: 'Roof repairs, maintenance, and replacement services',
        price: 699,
        icon: 'hammer',
        image: 'https://images.unsplash.com/photo-1597008437705-3f06abbdece4?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 11,
        name: 'Flooring',
        description: 'Installation and repair of tiles, hardwood, and carpets',
        price: 599,
        icon: 'paintbrush',
        image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&h=500&fit=crop&crop=center&auto=format'
      },
      {
        id: 12,
        name: 'Security Systems',
        description: 'Installation and maintenance of security cameras and alarms',
        price: 799,
        icon: 'zap',
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8d5?w=800&h=500&fit=crop&crop=center&auto=format'
      }
    ];
    localStorage.setItem('services', JSON.stringify(defaultServices));
  }

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
  }
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const updateUser = (email, updatedData) => {
  const users = getUsers();
  const index = users.findIndex(user => user.email === email);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const deleteUserByEmail = (email) => {
  const users = getUsers().filter(user => user.email !== email);
  localStorage.setItem('users', JSON.stringify(users));
  const current = getCurrentUser();
  if (current && current.email === email) {
    clearCurrentUser();
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};

export const getServices = () => {
  return JSON.parse(localStorage.getItem('services') || '[]');
};

export const addService = (service) => {
  const services = getServices();
  const newService = {
    ...service,
    id: Date.now()
  };
  services.push(newService);
  localStorage.setItem('services', JSON.stringify(services));
  return newService;
};

export const updateService = (id, updatedService) => {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updatedService };
    localStorage.setItem('services', JSON.stringify(services));
  }
};

export const deleteService = (id) => {
  const services = getServices();
  const filtered = services.filter(s => s.id !== id);
  localStorage.setItem('services', JSON.stringify(filtered));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};

export const getUserBookings = (userEmail) => {
  const bookings = getBookings();
  return bookings.filter(b => b.userEmail === userEmail);
};

export const addBooking = (booking) => {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  };
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (id, status) => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
};

export const deleteBooking = (id) => {
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  localStorage.setItem('bookings', JSON.stringify(filtered));
};
