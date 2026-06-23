import React from 'react';

/**
 * Loading Spinner Component
 * @param {Object} props
 * @param {string} [props.size] - Size of the spinner ('small', 'medium', 'large')
 * @param {string} [props.text] - Optional text to display
 * @param {boolean} [props.fullScreen] - Whether to show as full screen overlay
 */
const LoadingSpinner = ({ size = 'medium', text, fullScreen = false }) => {
  const sizeClasses = {
    small: 'loading-spinner-small',
    medium: 'loading-spinner',
    large: 'loading-spinner-large'
  };

  const spinner = (
    <div className={`${sizeClasses[size]} ${text ? 'with-text' : ''}`}>
      <div className="loading-spinner"></div>
      {text && <p>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
