import React from 'react';
import '../../module/ConfirmDialog.css';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="confirm-dialog">
    <div className="confirm-dialog-content">
      <p>{message}</p>
      <div className="confirm-dialog-actions">
        <button onClick={onConfirm} className="confirm-btn">Yes</button>
        <button onClick={onCancel} className="cancel-btn">No</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;