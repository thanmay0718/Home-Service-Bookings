# Home Services Booking Platform

A modern, responsive web application for booking home services built with React, JavaScript, and Vite.

## 🚀 Features

- **User Authentication**: Secure login/signup system with role-based access
- **Service Management**: Browse and book various home services
- **Admin Dashboard**: Complete admin panel for managing services, bookings, and users
- **User Dashboard**: Personal dashboard for managing bookings and profile
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Validation**: Form validation with instant feedback
- **Error Handling**: Comprehensive error boundaries and loading states

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables, Tailwind CSS
- **Icons**: React Icons, Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Storage**: LocalStorage (for demo purposes)
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── ServiceCard.jsx
│   ├── BookingCard.jsx
│   └── ToastMessage.jsx
├── context/            # React Context providers
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── UserLogin.jsx
│   ├── UserSignup.jsx
│   ├── UserDashboard.jsx
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── BookService.jsx
│   ├── BookingDetails.jsx
│   ├── AboutUs.jsx
│   ├── Contact.jsx
│   └── Policy.jsx
├── styles/             # CSS stylesheets
│   ├── global.css
│   ├── navbar.css
│   ├── home.css
│   ├── cards.css
│   ├── forms.css
│   ├── dashboard.css
│   ├── footer.css
│   └── pages.css
├── utils/              # Utility functions
│   ├── storage.js
│   └── validation.js
├── App.jsx
└── main.jsx
```

## 🎯 Key Improvements Made

### 1. **Code Quality & Documentation**
- Added comprehensive JSDoc type annotations
- Improved code documentation and IntelliSense support
- Converted from TypeScript to pure JavaScript

### 2. **Error Handling**
- Implemented Error Boundary component for graceful error handling
- Added comprehensive error states and user feedback
- Development-only error details for debugging

### 3. **Form Validation**
- Created robust validation utility with multiple validation rules
- Real-time form validation with instant feedback
- Email, phone, password, and address validation
- Clear error messages and visual indicators

### 4. **Loading States**
- Added LoadingSpinner component with multiple sizes
- Implemented loading states for all async operations
- Better user experience during form submissions

### 5. **Code Quality**
- Fixed code duplication in BookingDetails component
- Removed unused Supabase dependency
- Converted entire project from TypeScript to JavaScript
- Improved component structure and reusability
- Added proper error handling throughout the app

### 6. **User Experience**
- Enhanced form interactions with better validation
- Improved loading states and user feedback
- Better error messages and recovery options
- Consistent styling and behavior

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Default Credentials

### Admin Account
- **Email**: admin@homeservices.com
- **Password**: admin123

### Test User Account
- **Email**: user@example.com
- **Password**: user123

*Note: You can create new accounts through the signup page.*

## 📱 Features Overview

### User Features
- **Browse Services**: View available home services with pricing
- **Book Services**: Schedule services with date/time selection
- **Manage Bookings**: View, cancel, and track booking status
- **Profile Management**: Update personal information
- **Favorites**: Save favorite services for quick access
- **Notifications**: View platform notifications

### Admin Features
- **Analytics Dashboard**: View platform statistics and metrics
- **Service Management**: Add, edit, and delete services
- **User Management**: View and manage user accounts
- **Booking Management**: View all bookings and update status
- **Settings**: Configure platform settings

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: Amber (#f59e0b)
- **Success**: Green (#16a34a)
- **Danger**: Red (#ef4444)
- **Background**: Slate (#f8fafc)
- **Text**: Dark Slate (#0f172a)

### Typography
- **Font Family**: Poppins
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Multiple variants with hover effects
- **Forms**: Consistent styling with validation states
- **Cards**: Service cards, booking cards, analytics cards
- **Modals**: Toast messages and loading overlays

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=Home Services Platform
VITE_APP_VERSION=1.0.0
```

### Customization
- **Colors**: Modify CSS variables in `src/styles/global.css`
- **Services**: Update default services in `src/utils/storage.js`
- **Validation**: Customize validation rules in `src/utils/validation.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Passwords are stored in plain text (for demo purposes only)
- Data is stored in localStorage (not persistent across devices)
- No real-time updates or notifications

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Payment processing
- [ ] Service provider profiles
- [ ] Rating and review system
- [ ] Mobile app development
- [ ] Advanced analytics
- [ ] Multi-language support

## 📞 Support

For support, email support@homeservices.com or create an issue in the repository.

---

**Built with ❤️ using React and modern web technologies**
