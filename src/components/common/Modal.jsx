import React from 'react';

const Modal = ({ title, onClose, onSave, children }) => {
  const handleSave = () => {
    try {
      onSave();
      console.log("Modal save action performed.");
    } catch (error) {
      console.error("Error during modal save action:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;