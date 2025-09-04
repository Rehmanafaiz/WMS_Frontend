import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 2500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;
  return (
    <div className={`toast show position-fixed top-0 end-0 m-3 bg-${type}`} style={{ zIndex: 9999, minWidth: 220 }} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body text-white">{message}</div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default React.memo(Toast);
