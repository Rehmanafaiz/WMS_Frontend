import React from 'react';

const ConfirmDialog = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;
  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmDialog);
