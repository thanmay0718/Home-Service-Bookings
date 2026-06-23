import { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const ToastMessage = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
      </div>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>
        <FiX />
      </button>
    </div>
  );
};

export default ToastMessage;
