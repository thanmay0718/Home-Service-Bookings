/**
 * Form validation utilities
 */

/**
 * Validates email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number (basic validation)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneDigits = phone.replace(/\D/g, '');
  return phoneDigits.length >= 10 && phoneDigits.length <= 15;
};

/**
 * Validates password strength
 * @param {string} password
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates required fields
 * @param {Object} data - Object with form data
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates date is not in the past
 * @param {string} date - Date string in YYYY-MM-DD format
 * @returns {boolean}
 */
export const isDateInFuture = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

/**
 * Validates address length
 * @param {string} address
 * @returns {boolean}
 */
export const isValidAddress = (address) => {
  return address && address.trim().length >= 10;
};

/**
 * Comprehensive form validation
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  
  // Required field validation
  if (rules.required) {
    const requiredValidation = validateRequiredFields(formData, rules.required);
    Object.assign(errors, requiredValidation.errors);
  }
  
  // Email validation
  if (rules.email && formData.email) {
    if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  
  // Phone validation
  if (rules.phone && formData.phone) {
    if (!isValidPhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }
  
  // Password validation
  if (rules.password && formData.password) {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]; // Show first error
    }
  }
  
  // Confirm password validation
  if (rules.confirmPassword && formData.password && formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }
  
  // Date validation
  if (rules.date && formData.scheduledDate) {
    if (!isDateInFuture(formData.scheduledDate)) {
      errors.scheduledDate = 'Date cannot be in the past';
    }
  }
  
  // Address validation
  if (rules.address && formData.address) {
    if (!isValidAddress(formData.address)) {
      errors.address = 'Please provide a complete address (at least 10 characters)';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
