import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, setCurrentUser as saveCurrentUser, clearCurrentUser } from '../utils/storage';

/**
 * @typedef {Object} User
 * @property {number} [id]
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} [phone]
 * @property {string} [address]
 * @property {boolean} [isAdmin]
 * @property {string} [createdAt]
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} currentUser
 * @property {boolean} isAdmin
 * @property {boolean} isLoading
 * @property {function(User): void} login
 * @property {function(): void} logout
 * @property {boolean} isAuthenticated
 */

const AuthContext = createContext();

/**
 * Custom hook to use auth context
 * @returns {AuthContextType}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * Auth provider component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.isAdmin || false);
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function
   * @param {User} user
   */
  const login = (user) => {
    setCurrentUser(user);
    setIsAdmin(user.isAdmin || false);
    saveCurrentUser(user);
  };

  /**
   * Logout function
   */
  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    clearCurrentUser();
  };

  const value = {
    currentUser,
    isAdmin,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
