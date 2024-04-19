import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToolbarButton = ({ icon, tooltipText, onClick }) => {
  return (
    <div title={tooltipText} onClick={onClick} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default ToolbarButton;